/* Example Outlining Usage of Open-Cage Data's Geocoder

  API Docs & Other Info Available at:
  https://geocoder.opencagedata.com/api
*/

// api-key (christian@art-box.us)
// f64262866250468baf60eec7603c91b8

// Reverse geocoding (coords to address):
//    https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=f64262866250468baf60eec7603c91b8
// Forward geocoding (address to coords):
//    https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=f64262866250468baf60eec7603c91b8
//

// Google Maps Geocoder API key (for possible future reference)
// AIzaSyCUhGPwwNopLEvA1oz1ptnP-GeA8WO6DEw


apiKeyGeoCoder = "f64262866250468baf60eec7603c91b8";

const urlAPI = "https://api.opencagedata.com/geocode/v1/";

//searchParams() returns an object to be used with jQuery's .param() method

// query is GPS coordinates or physical address,
// fromCoord arg. is meant to be a boolean value to check whether or not the search is from GPS coordinates

function searchParams(query, fromCoord) {
let objPrm = {
q: query,
key: apiKeyGeoCoder,
};
return objPrm;
};

// let thisSearch = searchParams("420 Shakedown Street", true);
//queryURL = urlAPI + "json?" + thisSearch.JSONs;

/*

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


          /*
            moviePoster = $("#movie-poster");
            movieData = $("#movie-data");
            moviePoster.empty();
            movieData.empty();

            movTitle = response.Title;
            movYear = response.Year;
            movRated = response.Rated;
            movPlot = response.Plot;
            movPoster = response.Poster;

            displayData();


        });  */
