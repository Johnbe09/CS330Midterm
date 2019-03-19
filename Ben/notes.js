/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';

// async function getData(url) {
//     return fetch(url)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }

// async function newNumber() {
//     let numb = document.getElementById('input_number').value;
//     let intNumb = Number(numb);
//     let under = (intNumb - 1).toString();
//     let over = (intNumb + 1).toString();

//     let [actualData, underData, overData] = await Promise.all([
//         getData(`http://numbersapi.com/${intNumb}?json`),
//         getData(`http://numbersapi.com/${under}?json`),
//         getData(`http://numbersapi.com/${over}?json`)
//     ]);

//     let underDiv = document.getElementById('under');
//     let overDiv = document.getElementById('over');
//     let actualDiv = document.getElementById('exact');

//     underDiv.innerHTML = underData.text;
//     overDiv.innerHTML = overData.text;
//     actualDiv.innerHTML = actualData.text;

//     underDiv.setAttribute('class', 'alert alert-primary');
//     overDiv.setAttribute('class', 'alert alert-primary');
//     actualDiv.setAttribute('class', 'alert alert-primary');

// }