/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';


// var map;
// function initMap(map_lat, map_lng) {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: map_lat, lng: map_lng},
//     zoom: 14
//   });
// }

// initMap(45.559292,-94.156517);

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.559292, lng: -94.156517},
    zoom: 8
  });
}

console.log("Hello");
