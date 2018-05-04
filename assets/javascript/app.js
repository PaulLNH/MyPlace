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

var searchZip = "02215";
var searchCategory = "Networking+web+development";

// Store database obj to var
var database = firebase.database();
// Set our query URL for meetup API (currently a test url until we get one working with search results)
var queryURL = "https://arcane-journey-54280.herokuapp.com/meetup/search/open_events?zip=" + searchZip + "&and_text=False&offset=0&format=json&limited_events=False&text=" + searchCategory + "&photo-host=public&page=10&radius=50&omit=Blockchain&desc=False&status=upcoming&key=167c8504c5b17cb6e83a377e6d12";

// AJAX Call for JSON
function searchQuery() {
    // Meetup url
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (callback) {
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

// Sets a query index array that will populate with the search result objects
var queryIndex = [];

// Sets savedHistory as our localStorage variable
var savedHistory = JSON.parse(localStorage.getItem("history"));

// Leave this in or it breaks the map...
var map = null;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        center: currentPlace,
        // Removes the UI, we may actually want this in our app
        disableDefaultUI: true,
        styles: [{
                elementType: "geometry",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#746855"
                }]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }]
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#263c3f"
                }]
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#6b9a76"
                }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#38414e"
                }]
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#212a37"
                }]
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9ca5b3"
                }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    color: "#746855"
                }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#1f2835"
                }]
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#f3d19c"
                }]
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#2f3948"
                }]
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#17263c"
                }]
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#515c6d"
                }]
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#17263c"
                }]
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
$("body").on("click", "#searchBtn", function () {
    // Prevents the button from refreshing the page
    event.preventDefault();
    // Grab this from the input box
    searchZip = $("#zipCode")
        .val()
        .trim();
    // Grab this from the career drop down menu
    if ($("#dropDown").val() == "Web Developer") {
        searchCategory = "Networking+web+development";
    } else if ($("#dropDown").val() == "Graphic Designer") {
        searchCategory = "Networking+graphic+design";
    } else if ($("#dropDown").val() == "Software Engineer") {
        searchCategory = "Networking+software+engineer";
    }

    // Form Validation to ensure the fields are not blank
    if (!newSearch || !newActivity) {
        $("#editWarning")
            .text("You did not input all the necessary fields")
            .css("color", "red");
        setTimeout(function () {
            $("#editWarning")
                .text("")
                .css("color", "black");
        }, 3000);
    } else {
        // START OF LOGIC FOR LOCAL STORAGE

        // Adding search result from the textbox to our array
        savedHistory.push(newActivity + " in " + newSearch);
        console.log(savedHistory);

        // Ensures that we do not display more than 10 past searches
        if (savedHistory.length > 10) {
            savedHistory.shift();
        }

        // Overwrites our localStorage with our new array configuration
        localStorage.setItem("history", JSON.stringify(savedHistory));

        // Handles the processing of our movie array
        renderHistory();

        // Clears the search field for better UX
        $("#inputSearch").val("");
        // END OF LOGIC FOR LOCAL STORAGE

        // START OF LOGIC FOR FIREBASE STORAGE
        // Store the data locally until it gets pushed to the database
        // **** TODO: Add all of the pre-populated career topics and increment the one selected by 1 ****
        var searchHistory = {
            search: newSearch,
            activity: newActivity
        };
        // Render our search results
        // **** TODO: We will need to pass parameters through this function to complete the API url to make the AJAX call ****
        searchQuery();
        // Update database
        database.ref().update(searchHistory);
        // END OF LOGIC FOR FIREBASE STORAGE
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

// TODO: Match all the fields up with our interface

// Render the last 10 search results from local memory
function renderHistory() {
    savedHistory = JSON.parse(localStorage.getItem("history"));
    // Delete previous searches to prevent duplicates)
    $("#pastSearches").empty();

    // Loop through the array of searches
    for (var i = 0; i < savedHistory.length; i++) {
        // Dynamicaly generating search results for users history
        var a = $("<a>");
        var s = $("<span>");
        // Adding a class
        a.addClass("list-group-item search-btn");
        // Adding attributes
        a.attr({
            href: "#",
            // The data-parent #history assumes it will be part of a dropdown menu
            "data-parent": "#history",
            "data-name": savedHistory[i]
        });
        // Adding a class of searches to our menu
        s.addClass("d-none d-md-inline");
        // Adding the search text to the link (well span..)
        s.text(savedHistory[i]);
        // Adding the span to the anchor
        a.append(s);
        // Adding the searches to the menubar
        $("#pastSearches").append(a);
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
    database.ref().once("value", function (snapshot) {
        // If there is a snapshot run code
        if (snapshot.exists()) {
            // Iterate through each snapshot
            snapshot.forEach(function (data) {
                // Store everything into a variable.
            });
        }
    });
}

// On click function for carousel prev and next
$("#contentArea").on("slide.bs.carousel", function (e) {
    // e.relatedTarget is the entire current slide <div> element
    var currentSlideID = e.relatedTarget;
    // e.to is the next slide index (the one we are transitiong to)
    var currentSlide = e.to;
    // Calls the pan to map function and passes the current slide index through it
    panToNewPlace(currentSlide);
});

$(document).ready(function () {
    $(".carousel").carousel({
        interval: false
    });
    // Calls the search query function to initially populate the page
    searchQuery();
});