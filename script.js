$( document ).ready(function() {

// Button to call on click
  var searchBtn = document.getElementById('searchButton');
// Search Input
  var searchInput = document.getElementById('searchValue');
// Update areas on page
  var cityName = document.getElementById('cityName');
  var temp = document.getElementById('temp');
  var humidity = document.getElementById('humid');
  var wind = document.getElementById('wind');
  var uvIndex = document.getElementById('uv');
// Array to store search history
  var searchHist = [];
// ErrorModal contents
let modal = document.getElementById('errorModal');
let modalClose = document.getElementById('modalClose');
let errorContent = document.getElementById('errorContent');
// API key
  var apiKey = '13659ca4a2177fdbcfbf8f91bf870bd9'
// Using Luxon for Date/Time
   var dateTime = luxon.DateTime;


// need an onclick for searchBtn that updates the history
$(searchBtn).on('click', searchForWeather);

// Need to add onclick for history cities to be able to click

// need a call to the API
function searchForWeather() {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        error: function(err) {
            errorModal(err);
        }
    }).then(function(response) {
        console.log(response);
        // Function from below to update data
        updateWeather(response);
    })
}
});

function updateWeather(data) {
    // Need to update the time to current timezone else current days could get confused
    let rawTimezone = parseInt(data.dt) + parseInt(data.timezone);
    let ourTimezone = dateTime.fromSeconds(rawTimezone);

    // Set weather information to locations on html
    cityName.innerHTML = data.name + ' ' + ourTimezone.month + '/' + ourTimezone.day + '/' + ourTimezone.year;
    temp.innerHTML = 'Temperature: ' + data.main.temp + 'F°';
    humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';
    wind.innerHTML = 'Wind Speed: ' + data.wind.speed + 'MPH';
    
    // Using OneCall API URL
    let urlQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: urlQuery,
        method: 'GET',
        error: function(err){
            errorModal(err);
        }
    }).then(function(response){
        // need another function to update the 5 day forecast & uv index (not on original call)
        updateFiveDay(response);
    });
}