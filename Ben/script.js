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
    // let [scheduleData, teamData, standingsData] = await Promise.all([
    //     getData('http://data.nba.net/json/v1/2018/schedule.json'),
    //     getData('http://data.nba.net/json/v2/2018/teams.json'),
    //     getData('http://data.nba.net/json/cms/2018/league/standings.json ')
    // ]);

    let [parkData] = await Promise.all([
        // getData('https://stats.nba.com/stats/scoreboard/?GameDate=03/18/2019&LeagueID=00&DayOffset=0')
        // getData("https://stats.nba.com/js/data/playermovement/NBA_Player_Movement.json")
        // getData("http://data.nba.net/json/cms/2018/league/nba_games.json")
        getData(`https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=N9qYwDPpR2NIBkGg1YPr6FfGVsjc0xhFfON7ZmPN`)
    ]);
    console.log(parkData.data[0]);
    let parkName = parkData.data[0].name;

    let latlong = parkData.data[0].latLong;
    let latlongArray = latlong.split(" ");
    let lat = latlongArray[0].split(":");
    lat = lat[1].split(",");
    lat = lat[0];
    let long = latlongArray[1].split(":");
    long = long[1];

    let [cityWeather] = await Promise.all([
    //     // getData('https://stats.nba.com/stats/scoreboard/?GameDate=03/18/2019&LeagueID=00&DayOffset=0')
    //     // getData("https://stats.nba.com/js/data/playermovement/NBA_Player_Movement.json")
    //     // getData("http://data.nba.net/json/cms/2018/league/nba_games.json")
    //     //getData(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2b631a9cde7c2b110c438c3565bf8c5d`)
        getData(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=2b631a9cde7c2b110c438c3565bf8c5d`)
    ]);
    let temperatureK = cityWeather.main.temp;
    let temperatureF = (temperatureK -273.15) * 1.8 +32;
    temperatureF = temperatureF.toFixed(2);

    console.log(`The current temperature in ${parkName} National Park is ${temperatureF} degrees F`);
    
}

