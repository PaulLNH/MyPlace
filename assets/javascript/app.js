// Use this site to find Lat Lng: https://www.latlong.net/

// Array of our places, we can replace with with API JSON if we get one working, if not manually enter places (Maybe even fireabase, and allow it to be updateable)
var place = {
  UNH: {
    address: "105 Main St",
    city: "Durham",
    state: "NH",
    zip: "03824",
    lat: 43.1389,
    lng: -70.937
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

var currentPlace = {
  lat: place.UNH.lat,
  lng: place.UNH.lng
};

var currentSlide;

// var uluru = {
//   lat: currentPlace,
//   lng: place.UNH.lng
// };

var latitudeAdj = currentPlace.lat + 0.00039;

var centerAdj = {
  lat: latitudeAdj,
  lng: -70.937
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    // mapTypeId: google.maps.MapTypeId.HYBRID,
    center: centerAdj,
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

// Click on the images
$("body").on("click", ".newSlide", function() {
  // Nothing to go here anymore, holding for a rainy day
});

$(document).ready(function() {
  $(".carousel").carousel({
    interval: false
  });
});
