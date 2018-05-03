// Use this site to find Lat Lng: https://www.latlong.net/

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDaJQAkTI377TzsGmJkcDrEz3J6dvaZOHU",
  authDomain: "myplace-202423.firebaseapp.com",
  databaseURL: "https://myplace-202423.firebaseio.com",
  projectId: "myplace-202423",
  storageBucket: "myplace-202423.appspot.com",
  messagingSenderId: "644638328712"
};
firebase.initializeApp(config);

// Store database obj to var
var database = firebase.database();
// var data = {};
var queryURL =
  "https://arcane-journey-54280.herokuapp.com/meetup/search?group_urlname=ny-tech&sign=true";

// AJAX Call for JSON
function searchQuery() {
  // Meetup url
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(callback) {
    console.log(callback);
    // Renders our search results based off of AJAX call to our API
    renderSearchResults(callback);
    // Sets the background map to the first rendered meetup in the array
    panToNewPlace(0);
  });
}

// Initialize the current place
var currentPlace = {
  lat: 43.1389,
  lng: -70.937
};

var queryIndex = [];

// Leave this in or it breaks the map...
var map = null;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 20,
    // mapTypeId: google.maps.MapTypeId.HYBRID,
    center: currentPlace,
    // Removes the UI, we may actually want this in our app
    disableDefaultUI: true,
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#242f3e"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#242f3e"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#263c3f"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6b9a76"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#38414e"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#212a37"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9ca5b3"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#746855"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#1f2835"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#f3d19c"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#2f3948"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#17263c"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#515c6d"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#17263c"
          }
        ]
      }
    ]
  });
  // Sets the marker for the place
  var marker = new google.maps.Marker({
    position: currentPlace,
    map: map
  });
}

// Search button logic
$("body").on("click", "#searchBtn", function() {
  // Grab field inputs
  var newSearch = $("#inputSearch")
    .val()
    .trim();
  var newActivity = $("#inputActivity")
    .val()
    .trim();
  // Form Validation
  if (!newSearch || !newActivity) {
    $("#editWarning")
      .text("You did not input all the necessary fields")
      .css("color", "red");
    setTimeout(function() {
      $("#editWarning")
        .text("")
        .css("color", "black");
    }, 3000);
  } else {
    // Store the data locally until it gets pushed to the database
    var searchHistory = {
      search: newSearch,
      activity: newActivity
    };
    // Render our search results
    renderSearchResults();
    // Update database
    database.ref().update(searchHistory);
    // Hide modal
    $("#searchModal").modal("hide");
  }
});

function renderSearchResults(data) {
  var queryData = data.results;
  // TODO: Use data.results that is throwing errors currently
  console.log(Object.keys(queryData).length);
  // Clears the old search results
  $("#searchResults").html("");
  queryIndex = [];

  // For each iteration, we will create a new carousel
  for (var i = 0; i < Object.keys(data.results).length; i++) {
    if (i === 0) {
      $("#searchResults").append(
        '<div class="carousel-item active" id="' +
          queryData[i].name +
          '"><div class="img-block" id="' +
          queryData[i].name +
          'Img"><img class="d-block" src="' +
          queryData[i].photo_url +
          '" alt="' +
          queryData[i].title +
          '"></div><div class="card-title" id="' +
          queryData[i].name +
          'Title"><h3>' +
          queryData[i].name +
          '</h3></div><div class="card-body" id="' +
          queryData[i].name +
          'Body"><p>' +
          queryData[i].description +
          "</p></div></div>"
      );
      queryIndex.push(queryData[i]);
    } else {
      // Passes values into our html
      $("#searchResults").append(
        '<div class="carousel-item" id="' +
          queryData[i].name +
          '"><div class="img-block" id="' +
          queryData[i].name +
          'Img"><img class="d-block" src="' +
          queryData[i].photo_url +
          '" alt="' +
          queryData[i].name +
          '"></div><div class="card-title" id="' +
          queryData[i].name +
          'Title"><h3>' +
          queryData[i].name +
          '</h3></div><div class="card-body" id="' +
          queryData[i].name +
          'Body"><p>' +
          queryData[i].description +
          "</p></div></div>"
      );
      queryIndex.push(queryData[i]);
    }
  }
}

// Function to pan the map to current viewing location
function panToNewPlace(x) {
  var panToMe = queryIndex[x].venue;
  // Offset for the map to display in a viewable area
  var lonAdj = panToMe.lon + 0.00039;
  // Sets adjusted place for offset
  var placeAdj = new google.maps.LatLng(panToMe.lat, lonAdj);
  // Sets new place
  currentPlace = new google.maps.LatLng(panToMe.lat, panToMe.lon);
  // Pan to new place
  map.panTo(currentPlace);
  // Sets the marker for the place
  var marker = new google.maps.Marker({
    position: placeAdj,
    map: map
  });
}

// Function for Firebase data
function getPrevSearches() {
  database.ref().once("value", function(snapshot) {
    // If there is a snapshot run code
    if (snapshot.exists()) {
      // Iterate through each snapshot
      snapshot.forEach(function(data) {
        // Store everything into a variable.
      });
    }
  });
}

// On click function for carousel prev and next
$("#contentArea").on("slide.bs.carousel", function(e) {
  // e.relatedTarget is the entire current slide <div> element
  var currentSlideID = e.relatedTarget;
  // e.to is the next slide index (the one we are transitiong to)
  var currentSlide = e.to;
  // Calls the pan to map function and passes the current slide index through it
  panToNewPlace(currentSlide);
});

$(document).ready(function() {
  $(".carousel").carousel({
    interval: false
  });
  searchQuery();
  // renderSearchResults();
});
