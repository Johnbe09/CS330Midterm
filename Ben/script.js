/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';

async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function topGame() {
    let park = document.getElementById('input_park').value;

    let [parkData] = await Promise.all([
        getData(`https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=N9qYwDPpR2NIBkGg1YPr6FfGVsjc0xhFfON7ZmPN`)
    ]);
    // console.log(parkData.data[0]);
    let parkName = parkData.data[0].name;
    let latlong = parkData.data[0].latLong;
    let latlongArray = latlong.split(" ");
    var lat = latlongArray[0].split(":");
    lat = lat[1].split(",");
    lat = lat[0];
    var long = latlongArray[1].split(":");
    long = long[1];

    let [cityWeather] = await Promise.all([
        getData(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=2b631a9cde7c2b110c438c3565bf8c5d`)
    ]);
    let temperatureK = cityWeather.main.temp;
    let temperatureF = (temperatureK -273.15) * 1.8 +32;
    temperatureF = temperatureF.toFixed(2);

    let description = parkData.data[0].description;
    let parkDescription = document.getElementById('parkDescription');
    parkDescription.innerHTML = description;
    parkDescription.setAttribute('class', 'alert alert-primary');

    let note = document.getElementById('currentTemp');
    let fullName = parkData.data[0].fullName;
    note.innerHTML = `The current temperature in ${fullName} is ${temperatureF} degrees F`
    note.setAttribute('class', 'alert alert-primary');

    initMapParams(parseFloat(lat), parseFloat(long));

}

function initMapParams(mapLat, mapLong) {

    var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: mapLat, lng: mapLong},
    zoom: 8
    });
    var marker = new google.maps.Marker({
        position:{lat: mapLat, lng: mapLong},
        map:map
    });
}
