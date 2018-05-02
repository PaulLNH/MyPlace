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
    renderSearchResults(callback);
  });
}

// Array of our places, we can replace with with API JSON if we get one working, if not manually enter places (Maybe even fireabase, and allow it to be updateable)
var place = {
  0: {
    address: "105 Main St",
    city: "Durham",
    state: "NH",
    zip: "03824",
    lat: 43.1389,
    lng: -70.937,
    title: "University Of New Hampshire",
    body:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend tincidunt sodales. Donec lacinia eget mauris dapibus ornare. Praesent egestas tincidunt tempor. Fusce facilisis ante et consequat convallis. Maecenas nec arcu id purus interdum cursus. Morbi eu nibh nec dolor luctus consequat id eget elit. In elit nisl, consequat ut arcu vulputate, mattis lacinia velit. Praesent pellentesque ante nec enim malesuada, posuere sollicitudin ipsum mollis. Suspendisse mollis et metus vel varius. Donec sit amet magna sem. Mauris ultricies tristique lectus in malesuada. Phasellus lacus ipsum, bibendum non efficitur nec, sodales efficitur tellus. Nunc ac ultricies augue, eget aliquam erat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend tincidunt sodales. Donec lacinia eget mauris dapibus ornare. Praesent egestas tincidunt tempor. Fusce facilisis ante et consequat convallis. Maecenas nec arcu id purus interdum cursus. Morbi eu nibh nec dolor luctus consequat id eget elit. In elit nisl, consequat ut arcu vulputate, mattis lacinia velit. Praesent pellentesque ante nec enim malesuada, posuere sollicitudin ipsum mollis. Suspendisse mollis et metus vel varius. Donec sit amet magna sem. Mauris ultricies tristique lectus in malesuada. Phasellus lacus ipsum, bibendum non efficitur nec, sodales efficitur tellus. Nunc ac ultricies augue, eget aliquam erat.</p>",
    img: "assets/img/UNH.jpg"
  },
  1: {
    address: "320 Corporate Dr",
    city: "Portsmouth",
    state: "NH",
    zip: "03801",
    lat: 43.072149,
    lng: -70.798802,
    title: "Great Bay Community College",
    body:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend tincidunt sodales. Donec lacinia eget mauris dapibus ornare. Praesent egestas tincidunt tempor. Fusce facilisis ante et consequat convallis. Maecenas nec arcu id purus interdum cursus. Morbi eu nibh nec dolor luctus consequat id eget elit. In elit nisl, consequat ut arcu vulputate, mattis lacinia velit. Praesent pellentesque ante nec enim malesuada, posuere sollicitudin ipsum mollis. Suspendisse mollis et metus vel varius. Donec sit amet magna sem. Mauris ultricies tristique lectus in malesuada. Phasellus lacus ipsum, bibendum non efficitur nec, sodales efficitur tellus. Nunc ac ultricies augue, eget aliquam erat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend tincidunt sodales. Donec lacinia eget mauris dapibus ornare. Praesent egestas tincidunt tempor. Fusce facilisis ante et consequat convallis. Maecenas nec arcu id purus interdum cursus. Morbi eu nibh nec dolor luctus consequat id eget elit. In elit nisl, consequat ut arcu vulputate, mattis lacinia velit. Praesent pellentesque ante nec enim malesuada, posuere sollicitudin ipsum mollis. Suspendisse mollis et metus vel varius. Donec sit amet magna sem. Mauris ultricies tristique lectus in malesuada. Phasellus lacus ipsum, bibendum non efficitur nec, sodales efficitur tellus. Nunc ac ultricies augue, eget aliquam erat.</p>",
    img: "assets/img/GBCC.jpg"
  },
  2: {
    address: "77 Massachusetts Ave",
    city: "Cambridge",
    state: "MA",
    zip: "02139",
    lat: 42.359299,
    lng: -71.093526,
    title: "Massachusetts Institute of Technology",
    body:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend tincidunt sodales. Donec lacinia eget mauris dapibus ornare. Praesent egestas tincidunt tempor. Fusce facilisis ante et consequat convallis. Maecenas nec arcu id purus interdum cursus. Morbi eu nibh nec dolor luctus consequat id eget elit. In elit nisl, consequat ut arcu vulputate, mattis lacinia velit. Praesent pellentesque ante nec enim malesuada, posuere sollicitudin ipsum mollis. Suspendisse mollis et metus vel varius. Donec sit amet magna sem. Mauris ultricies tristique lectus in malesuada. Phasellus lacus ipsum, bibendum non efficitur nec, sodales efficitur tellus. Nunc ac ultricies augue, eget aliquam erat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend tincidunt sodales. Donec lacinia eget mauris dapibus ornare. Praesent egestas tincidunt tempor. Fusce facilisis ante et consequat convallis. Maecenas nec arcu id purus interdum cursus. Morbi eu nibh nec dolor luctus consequat id eget elit. In elit nisl, consequat ut arcu vulputate, mattis lacinia velit. Praesent pellentesque ante nec enim malesuada, posuere sollicitudin ipsum mollis. Suspendisse mollis et metus vel varius. Donec sit amet magna sem. Mauris ultricies tristique lectus in malesuada. Phasellus lacus ipsum, bibendum non efficitur nec, sodales efficitur tellus. Nunc ac ultricies augue, eget aliquam erat.</p>",
    img: "assets/img/MIT.jpg"
  }
};
// Initialize the current place
var currentPlace = {
  lat: place[0].lat,
  lng: place[0].lng
};

// Store current slide in local memory
var currentSlide;
// Leave this in or it breaks the map...
var map = null;

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
    } else {
      console.log(queryData[i].title);
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
    }
  }
}

// Store lat & lng info into an array
// Randomize questions
function latLng() {
  roundQuestions = [];
  // Logic to pick questions for a new round
  while (roundQuestions.length < howManyQuestions) {
    // Select a random number that represents the trivia array
    var r = Math.floor(Math.random() * Object.keys(trivia).length);
    // If that index is not in the array, add it to the array
    if (roundQuestions.indexOf(trivia[r]) === -1) {
      // Add trivia question to round questions
      roundQuestions.push(trivia[r]);
    }
  }
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
  // e.relatedTarget is the entire current slide <div> element
  var currentSlideID = e.relatedTarget;
  // e.to is the next slide index (the one we are transitiong to)
  var currentSlide = e.to;

  switch ($(currentSlideID).attr("id")) {
    case "UNH":
      panToNewPlace(place[currentSlide]);
      break;
    case "GBCC":
      panToNewPlace(place[currentSlide]);
      break;
    case "MIT":
      panToNewPlace(place[currentSlide]);
      break;
    default:
      panToNewPlace(place[currentSlide]);
  }
});

$(document).ready(function() {
  $(".carousel").carousel({
    interval: false
  });
  searchQuery();
  // renderSearchResults();
});
