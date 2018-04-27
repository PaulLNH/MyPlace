// Example Outlining Usage of Open-Cage Data's Geocoder

// API Docs & Other Info Available at:
// https://geocoder.opencagedata.com/api

// api-key (christian@art-box.us)
// f64262866250468baf60eec7603c91b8

// Reverse:
//    https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=f64262866250468baf60eec7603c91b8
// Forward geocoding:
//    https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=f64262866250468baf60eec7603c91b8
//

const urlAPI = "https://api.opencagedata.com/geocode/v1/json?";

  apiKeyOCDGeo = "f64262866250468baf60eec7603c91b8";

function parameters(query, fromCoord) {
  let parameters = urlAPI + "json?" +
  srchQuery: query, //address or coordinates (Note: it will be much easier to verify that coordinates are formatted correctly)
  fromCoord: isCoord, // Boolean value; are you using coordinates instead of a GPS?
  apiKey: apiKeyGeoCoder;
}
return parameters;
};

console.log(parameters("420 Shakedown Street", true));
