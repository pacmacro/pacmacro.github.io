/*
 * This Javascript file provides a function to generate a Pac Macro map
 * with players and pacdots which are updated periodically.
 *
 */

var config = {
  server: {
    baseUrl: "http://pacmacro.herokuapp.com",
    pathPlayerDetails: "/player/details",
    pathPacdots: "/pacdots"
  },
  mapLocation: {
    downtownVancouver: {
      lat: 49.283609,
      lng: -123.116464
    },
    sfuBurnaby: {
      lat: 49.278483,
      lng: -122.914085
    }
  }
 };

var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var playerStates = {
  uninitialized: "UNINITIALIZED",
  ready: "READY",
  active: "ACTIVE",
  captured: "CAPTURED"
};

var map;
var players;
var pacdotList = [];

// This function returns a new Google Maps Marker object for a player
// Attributes are standardized for consistency.
function createPlayerMarker(title, iconUrl) {
  return new google.maps.Marker({
    icon: {
      url: iconUrl,
      scaledSize: new google.maps.Size(30, 30),
      anchor: new google.maps.Point(15, 15)
    },
    position: {
      lat: 49.283609,
      lng: -123.116464
    },
    title: title,
    zIndex: google.maps.Marker.MAX_ZINDEX + 1
  });
}

// This function generates the map and players, and initializes server updates.
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: config.mapLocation.downtownVancouver,
    zoom: 16
  });

  players = [
    createPlayerMarker("Pacman", "assets/img/pacman.svg"),
    createPlayerMarker("Inky", "assets/img/inky.svg"),
    createPlayerMarker("Blinky", "assets/img/blinky.svg"),
    createPlayerMarker("Pinky", "assets/img/pinky.svg"),
    createPlayerMarker("Clyde", "assets/img/clyde.svg")
  ];

  setInterval(updatePacdots, 3000);
  setInterval(updatePlayers, 3000);
}

// This function retrieves all Pacdot information from the server and updates
// the map upon changes.
function updatePacdots() {
  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", config.server.baseUrl + config.server.pathPacdots, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);

  var initialization = pacdotList.length === 0;

  if(initialization) {
    for (var i = 0; i < response.length; i++) {
      var size = response[i].powerdot ? 40 : 20;

      var pacdot = new google.maps.Marker({
        icon: {
          url: "assets/img/pacdot.svg",
          scaledSize: new google.maps.Size(size, size),
          anchor: new google.maps.Point(size/2, size/2)
        },
        position: {
          lat: response[i].location.latitude,
          lng: response[i].location.longitude
        }
      });

      pacdot.setMap(map);
      pacdotList.push(pacdot);
    }
  }
  else {
    for (var i = 0; i < response.length; i++) {
      var pacdot = pacdotList.find(x => x.getPosition().lat() === response[i].location.latitude);

      // Reveal or hide pacdot icon
      if (pacdot.getMap() == null && !response[i].eaten) {
        pacdot.setMap(map);
      } else if (pacdot.getMap() == map && response[i].eaten) {
        pacdot.setMap(null);
      }
    }
  }
}

// This function retrieves all Player information from the server and updates
// the map upon changes.
function updatePlayers() {
  var xhttp = new XMLHttpRequest();

  xhttp.open(
      "GET",
      config.server.baseUrl + config.server.pathPlayerDetails,
      false
  );
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);

  for (var i = 0; i < response.length; i++) {
    player = players.find(x => x.title === response[i].name);

    // Reveal or hide player icon
    if (player.getMap() == null &&
        response[i].state !== playerStates.uninitialized) {
      player.setMap(map);
    } else if (player.getMap() == map &&
        response[i].state === playerStates.uninitialized) {
      player.setMap(null);
    }

    player.setPosition({
      lat: response[i].location.latitude,
      lng: response[i].location.longitude
    });
  }
}