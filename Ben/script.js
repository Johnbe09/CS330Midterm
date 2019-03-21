/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';


async function getData(url) {
    return fetch(url)
    //return fetch(url, {'mode': 'no-cors'})
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function topGame() {
    let parkName = document.getElementById('input_date').innerHTML;
    console.log(parkName);
    let park = document.getElementById('input_date').value;
    // console.log(park);
    // let [scheduleData, teamData, standingsData] = await Promise.all([
    //     getData('http://data.nba.net/json/v1/2018/schedule.json'),
    //     getData('http://data.nba.net/json/v2/2018/teams.json'),
    //     getData('http://data.nba.net/json/cms/2018/league/standings.json ')
    // ]);
    // console.log(standingsData);
    
    // let park = 'acad';
    let [parkData] = await Promise.all([
        // getData('https://stats.nba.com/stats/scoreboard/?GameDate=03/18/2019&LeagueID=00&DayOffset=0')
        // getData("https://stats.nba.com/js/data/playermovement/NBA_Player_Movement.json")
        // getData("http://data.nba.net/json/cms/2018/league/nba_games.json")
        getData(`https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=N9qYwDPpR2NIBkGg1YPr6FfGVsjc0xhFfON7ZmPN`)
    ]);
    // console.log(parkData);

    let latlong = parkData.data[0].latLong;
    // console.log(latlong);
    let latlongArray = latlong.split(" ");
    let lat = latlongArray[0].split(":");
    lat = lat[1].split(",");
    lat = lat[0];
    let long = latlongArray[1].split(":");
    long = long[1];

    // console.log(lat);
    // console.log(long);

    // let lon = '-114';

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
    // console.log(cityWeather);
    console.log(temperatureF + " degrees F");







    // let intNumb = Number(numb);
    // let under = (intNumb - 1).toString();
    // let over = (intNumb + 1).toString();

    // let [actualData, underData, overData] = await Promise.all([
    //     getData(`http://numbersapi.com/${intNumb}?json`),
    //     getData(`http://numbersapi.com/${under}?json`),
    //     getData(`http://numbersapi.com/${over}?json`)
    // ]);

    // let underDiv = document.getElementById('under');
    // let overDiv = document.getElementById('over');
    // let actualDiv = document.getElementById('exact');

    // underDiv.innerHTML = underData.text;
    // overDiv.innerHTML = overData.text;
    // actualDiv.innerHTML = actualData.text;

    // underDiv.setAttribute('class', 'alert alert-primary');
    // overDiv.setAttribute('class', 'alert alert-primary');
    // actualDiv.setAttribute('class', 'alert alert-primary');
    
}

