/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';

// backup national park api key: olV57qfxb2RvtEofE0UYsPRRhphPjaXPaD6kyhjo

let stateDict = {"" : " ", "AL" : "Alabama", "AK" : "Alaska", 
                "AZ" : "Arizona", "AR" : "Arkansas", "CA" : "California", 
                "CO" : "Colorado", "CT" : "Connecticut", "DE" : "Delaware", 
                "FL" : "Florida", "GA" : "Georgia", "HI" : "Hawaii", "ID" : "Idaho", 
                "IL" : "Illinois", "IN" : "Indiana", "IA" : "Iowa", "KS" : "Kansas", 
                "KY" : "Kentucky", "LA" : "Louisiana", "ME" : "Maine", "MD" : "Maryland", 
                "MA" : "Massachusetts", "MI" : "Michigan", "MN" : "Minnesota", 
                "MS" : "Mississippi", "MO" : "Missouri", "MT" : "Montana", 
                "NE" : "Nebraska", "NV" : "Nevada", "NH" : "New Hampshire", 
                "NJ" : "New Jersey", "NM" : "New Mexico", "NY" : "New York", 
                "NC" : "North Carolina", "ND" : "North Dakota", "OH" : "Ohio", 
                "OK" : "Oklahoma", "OR" : "Oregon", "PA" : "Pennsylvania", 
                "RI" : "Rhode Island", "SC" : "South Carolina", "SD" : "South Dakota", 
                "TN" : "Tennessee", "TX" : "Texas", "UT" : "Utah", "VT" : "Vermont", 
                "VA" : "Virginia", "WA" : "Washington", "WV" : "West Virginia", 
                "WI" : "Wisconsin", "WY" : "Wyoming", "DC" : "Washington DC"}

function populateSelectOption() {

    let states = document.getElementById(`input_state`);
    
    
    for(var key in stateDict) {
        var val = stateDict[key];
        let choice = document.createElement(`option`);
        choice.innerHTML = val;
        choice.value = key;
        states.appendChild(choice);   
    }
}


async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}



async function selectState() {
    let state = document.getElementById('input_state').value;
    let [stateData] = await Promise.all([
        getData(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=N9qYwDPpR2NIBkGg1YPr6FfGVsjc0xhFfON7ZmPN`)
    ]);

    let myList = {};
    for (let state of Object.keys(stateData.data)) {
        let ah = parseInt(state);
        let name = stateData.data[ah].fullName;
        let code = stateData.data[ah].parkCode;
        myList[code] = name;
    }

    let form = document.getElementById(`input_park`);
    while (form.length > 0) {
        form.remove(form.length-1);
    }
 
    let choice = document.createElement(`option`);
    choice.innerHTML = "Choose a Park";
    choice.value = " ";
    form.appendChild(choice);  

    for(var key in myList) {
        var val = myList[key];
        let choice = document.createElement(`option`);
        choice.innerHTML = val;
        choice.value = key;
        form.appendChild(choice);   
    }

}

async function topGame() {
    let park = document.getElementById('input_park').value;

    let [parkData] = await Promise.all([
        getData(`https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=N9qYwDPpR2NIBkGg1YPr6FfGVsjc0xhFfON7ZmPN`)
    ]);

    var latlong = parkData.data[0].latLong;
    if (latlong) {
        let latlongArray = latlong.split(" ");
        var lat = latlongArray[0].split(":");
        lat = lat[1].split(",");
        lat = lat[0];
        var long = latlongArray[1].split(":");
        long = long[1];
    } else {
        var latLong = "large";
        var lat = 39.1001;
        var long = -94.5781;
        
    }
    
    let description = parkData.data[0].description;
    let parkDescription = document.getElementById('parkDescription');
    parkDescription.innerHTML = description;
    parkDescription.setAttribute('class', 'information alert alert-primary');

    if (latLong == "large") {
        let note = document.getElementById('currentTemp');
        let fullName = parkData.data[0].fullName;
        note.innerHTML = `Because ${fullName} spans a very large area or even several states, check the region you plan on visiting for local weather.`
        note.setAttribute('class', 'first information alert alert-warning');

        mapReturn();

    } else {

        let [cityWeather] = await Promise.all([
            getData(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=2b631a9cde7c2b110c438c3565bf8c5d`)
        ]);
        let temperatureK = cityWeather.main.temp;
        let temperatureF = (temperatureK -273.15) * 1.8 +32;
        temperatureF = temperatureF.toFixed(2);
    
        let note = document.getElementById('currentTemp');
        let fullName = parkData.data[0].fullName;
        note.innerHTML = `The current temperature in ${fullName} is ${temperatureF}° F`
        note.setAttribute('class', 'second information alert alert-warning');
    
        initMapParams(parseFloat(lat), parseFloat(long), 8);
    }

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

function mapReturn() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.1001, lng: -94.5781},
        zoom: 3
    }); 

}



window.onload = function() {
    populateSelectOption();
};
