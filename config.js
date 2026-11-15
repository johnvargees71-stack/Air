/*
  AirWatch settings.

  waqiToken: free token from https://aqicn.org/data-platform/token/
  It unlocks real readings from government monitoring stations (CPCB and state
  pollution boards in India). Paste it between the quotes below.
  Without a token the app still works, but shows a labelled regional model estimate.

  maxStationKm: a station farther than this from your chosen place is not used.
*/
window.AIRWATCH_CONFIG = {
  waqiToken: "",
  maxStationKm: 50
};
