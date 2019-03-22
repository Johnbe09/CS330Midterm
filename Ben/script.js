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
    let state = document.getElementById('input_state').value;

    let [parkData] = await Promise.all([
        getData(`https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=N9qYwDPpR2NIBkGg1YPr6FfGVsjc0xhFfON7ZmPN`)
    ]);
    let [stateData] = await Promise.all([
        getData(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=N9qYwDPpR2NIBkGg1YPr6FfGVsjc0xhFfON7ZmPN`)
    ]);
    let [allParkData] = await Promise.all([
        getData(`https://developer.nps.gov/api/v1/parks?limit=500&api_key=N9qYwDPpR2NIBkGg1YPr6FfGVsjc0xhFfON7ZmPN`)
    ]);


    console.log(parkData.data[0]);
    console.log(stateData.data);
    console.log(allParkData.data);
    let myList = {};
    for (let state of Object.keys(stateData.data)) {
        let ah = parseInt(state);
        // console.log(stateData.data[ah]);
        let name = stateData.data[ah].fullName;
        let code = stateData.data[ah].parkCode;
        // console.log(stateData.data[ah].fullName);
        // console.log(stateData.data[ah].parkCode);
        myList[code] = name;
    }


    let spot = document.getElementById("try");
    for (let park of Object.keys(allParkData.data)) {
        let num = parseInt(park);
        let name = allParkData.data[num].fullName;
        console.log(name);
        let text = document.createElement("li");
        text.innerHTML = name;
        spot.appendChild(text);
    }
    
    // console.log(myList);
    
    // let parkList = {};
    // for (let state of Object.keys(stateData.data)) {
    //     let ah = parseInt(state);
    //     // console.log(stateData.data[ah]);
    //     let name = stateData.data[ah].fullName;
    //     let code = stateData.data[ah].parkCode;
    //     // console.log(stateData.data[ah].fullName);
    //     // console.log(stateData.data[ah].parkCode);
    //     myList[code] = name;
    // }
    
    // console.log(myList);
    
    
    let form = document.getElementById(`input_yeet`);
    while (form.length > 0) {
        form.remove(form.length-1);
    }
    

    for(var key in myList) {
        var val = myList[key];
        // console.log(key);
        // console.log(val);
        let choice = document.createElement(`option`);
        choice.innerHTML = val;
        choice.value = key;
        form.appendChild(choice);   
    }
    

    // let parkName = parkData.data[0].name;
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

// function populateSelectOption(elementID, optionsArray) {
//     let menu = document.querySelector(elementID);
//     for (let artist of optionsArray) {
//         let newOption = socument.createElement("option");

//     }
// }
