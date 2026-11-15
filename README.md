# AirWatch

Live air quality for your location or any city, town or area in India, with a Good / Normal / Bad verdict and alerts when the air gets worse.

Developed by Ronin Antony AJ.

## Files

Keep all of these together in the same folder (the root of your site):

- `index.html` the app
- `config.js` your settings (token goes here)
- `sw.js` notifications and offline shell
- `manifest.webmanifest` and `icon.svg` install-as-app support

## Get accurate readings (2 minutes)

The most accurate source is a real government monitoring station, not a model.

1. Open https://aqicn.org/data-platform/token/ and enter your email.
2. Copy the token from the confirmation email.
3. Open `config.js` and paste it:
   ```js
   waqiToken: "your-token-here",
   ```
4. Upload the files again.

With a token, the app uses the nearest CPCB or state pollution board station (within 50 km, reported in the last 4 hours) and shows its name, distance and measurement time. If no station is close enough, it falls back to a regional model estimate and says so on screen. The 24-hour forecast is always the model.

The token is visible to anyone who opens the site. That is normal for this free service; it only allows reading public data.

## Deploy

Use any static host. Upload the folder contents so `index.html` sits in the top level.

- Netlify: drag the folder onto app.netlify.com/drop
- Vercel: run `npx vercel --prod` inside the folder
- Cloudflare Pages: Create project, Direct upload
- GitHub Pages: Settings, Pages, Deploy from branch `main`, folder `/ (root)`

Open the `https://` link. Location access and notifications only work on `https://` or `localhost`.

## Data sources

- World Air Quality Index project (aqicn.org): station readings, including CPCB
- Open-Meteo Air Quality (CAMS model): fallback estimate and 24-hour forecast
- Open-Meteo Geocoding: place search
- BigDataCloud: place name for your GPS position
