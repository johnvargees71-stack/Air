/* AirWatch service worker: caches the app shell and routes notification taps back to the app. */
const CACHE = "airwatch-v2";
const SHELL = ["./", "index.html", "config.js", "manifest.webmanifest", "icon.svg"];

self.addEventListener("install", (e) => {
  // Add files one by one so a missing optional file never blocks installation.
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(SHELL.map((f) => c.add(f).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Only the app shell is cached; live air quality requests always go to the network.
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ("focus" in c) return c.focus(); }
      return self.clients.openWindow("./");
    })
  );
});
