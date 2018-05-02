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

// Array of our places, we can replace with with API JSON if we get one working, if not manually enter places (Maybe even fireabase, and allow it to be updateable)
var place = {
  UNH: {
    address: "105 Main St",
    city: "Durham",
    state: "NH",
    zip: "03824",
    lat: 43.1389,
    lng: -70.937,
    title: "UNH",
    description: "Something Something"
  },
  GBCC: {
    address: "320 Corporate Dr",
    city: "Portsmouth",
    state: "NH",
    zip: "03801",
    lat: 43.072149,
    lng: -70.798802
  },
  MIT: {
    address: "77 Massachusetts Ave",
    city: "Cambridge",
    state: "MA",
    zip: "02139",
    lat: 42.359299,
    lng: -71.093526
  }
};
// Initialize the current place
var currentPlace = {
  lat: place.UNH.lat,
  lng: place.UNH.lng
};

// Store current slide in local memory
var currentSlide;

// Offset for the map to display in a viewable area
var latitudeAdj = currentPlace.lat + 0.00039;

var centerAdj = {
  lat: latitudeAdj,
  lng: currentPlace.lng
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 20,
    // mapTypeId: google.maps.MapTypeId.HYBRID,
    center: currentPlace,
    // Removes the UI, we may actually want this in our app
    disableDefaultUI: true,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
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

function renderSearchResults() {
  // Clears the table
  $("#searchResults").html("");
  // Calls the info from the database, passes the snapshot
  database.ref().once("value", function(snapshot) {
    // If there is a snapshot run code
    if (snapshot.exists()) {
      // Iterate through each snapshot
      snapshot.forEach(function(data) {
        // Store everything into a variable.
        var photo = data.val().photo;
        var title = data.val().title;
        var description = data.val().description;
        var date = data.val().date;

        div.addClass("carousel-item active");
        // Add each train's data into the table
        $("#searchResults").append(
          // Placeholder - This area needs to render the carousel

          '<div class="carousel-item active" id="' +
            title +
            '><div class="img-block" id="' +
            photo[i] +
            '"><img class="d-block" src="' +
            photo[i] +
            '" alt="' +
            title +
            '"></div><div class="card-title" id="' +
            title[i] +
            '"><h3>' +
            Title[i] +
            '</h3></div><div class="card-body" id="' +
            body[i] +
            '"><p>' +
            body[i] +
            "</p></div></div>"
        );
      });
    }
  });
}

function panToNewPlace(x) {
  // Sets new place
  currentPlace = new google.maps.LatLng(x.lat, x.lng);
  // Pan to new place
  map.panTo(currentPlace);
  // Sets the marker for the place
  var marker = new google.maps.Marker({
    position: currentPlace,
    map: map
  });
}

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

$("#contentArea").on("slide.bs.carousel", function(e) {
  console.log("The direction in which the carousel is sliding: " + e.direction); // The direction in which the carousel is sliding (either "left" or "right").
  var currentSlide = e.relatedTarget;
  console.log(currentSlide); // The DOM element that is being slid into place as the active item.
  console.log("The index of the current item: " + e.from); // The index of the current item.
  console.log("The index of the next item: " + e.to); // The index of the next item.

  switch ($(currentSlide).attr("id")) {
    case "UNH":
      panToNewPlace(place.UNH);
      break;
    case "GBCC":
      panToNewPlace(place.GBCC);
      break;
    case "MIT":
      panToNewPlace(place.MIT);
      break;
    default:
      panToNewPlace(place.UNH);
  }
});

$(document).ready(function() {
  $(".carousel").carousel({
    interval: false
  });
});
