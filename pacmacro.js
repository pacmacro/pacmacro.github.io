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
  pathPlayerDetails: "/player/details"
};

var map;
var players;
var pacdots;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.283609, lng: -123.116464},
    zoom: 16
  });

  players = [
    new google.maps.Marker({
      active: false,
      position: {lat:49.283609, lng:-123.116464},
      title: "Pacman"
    }),
    new google.maps.Marker({
      active: false,
      position: {lat:49.283609, lng:-123.116464},
      title: "Inky"
    }),
    new google.maps.Marker({
      active: false,
      position: {lat:49.283609, lng:-123.116464},
      title: "Blinky"
    }),
    new google.maps.Marker({
      active: false,
      position: {lat:49.283609, lng:-123.116464},
      title: "Pinky"
    }),
    new google.maps.Marker({
      active: false,
      position: {lat:49.283609, lng:-123.116464},
      title: "Clyde"
    })
  ];

  setInterval(updatePlayers, 800);
}

function updatePlayers() {
  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", server.baseUrl + server.pathPlayerDetails, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);

  for (var i = 0; i < response.length; i++) {
    player = players.find(x => x.title === response[i].name);

    player.active = response[i].state !== playerStates.uninitialized;
    player.active ? player.setMap(map) : player.setMap(null);

    player.setPosition({
      lat: response[i].location.latitude,
      lng: response[i].location.longitude
    });
  }
}