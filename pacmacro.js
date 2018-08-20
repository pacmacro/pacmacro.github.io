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

var server = {
  baseUrl: "http://pacmacro.herokuapp.com",
  pathPlayerDetails: "/player/details",
  pathPacdots: "/pacdots"
};

var map;
var players;
var pacdotList = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.283609, lng: -123.116464},
    zoom: 16
  });

  players = [
    new google.maps.Marker({
      position: {lat:49.283609, lng:-123.116464},
      title: "Pacman"
    }),
    new google.maps.Marker({
      position: {lat:49.283609, lng:-123.116464},
      title: "Inky"
    }),
    new google.maps.Marker({
      position: {lat:49.283609, lng:-123.116464},
      title: "Blinky"
    }),
    new google.maps.Marker({
      position: {lat:49.283609, lng:-123.116464},
      title: "Pinky"
    }),
    new google.maps.Marker({
      position: {lat:49.283609, lng:-123.116464},
      title: "Clyde"
    })
  ];

  setInterval(updatePacdots, 800);
  setInterval(updatePlayers, 800);
}

function updatePacdots() {
  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", server.baseUrl + server.pathPacdots, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);

  var initialization = pacdotList.length === 0;

  if(initialization) {
    for (var i = 0; i < response.length; i++) {
      var pacdot = new google.maps.Marker({
        position: {
          lat:response[i].location.latitude,
          lng:response[i].location.longitude
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

function updatePlayers() {
  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", server.baseUrl + server.pathPlayerDetails, false);
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