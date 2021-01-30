$(document).ready(function () {

    // Button to call on click
    let searchBtn = document.getElementById('searchButton');
    // Search Input
    let searchInput = document.getElementById('searchValue');
    // Update areas on page
    let cityName = document.getElementById('cityName');
    let temp = document.getElementById('temp');
    let humidity = document.getElementById('humid');
    let wind = document.getElementById('wind');
    let uvIndex = document.getElementById('uv');
    // 5 Day Forecast areas to update
    let forecastFive = document.getElementById('forecastFive');
    // Array to store search history
    var searchHist = [];
    // ErrorModal contents
    let errorModal = document.getElementById('errorModal');
    let modalClose = document.getElementById('modalClose');
    let errorContent = document.getElementById('errorContent');
    // API key
    const apiKey = '13659ca4a2177fdbcfbf8f91bf870bd9'
    // Using Luxon for Date/Time
    let dateTime = luxon.DateTime;


    // need an onclick for searchBtn that updates the history
    $(searchBtn).on('click', (e) => {
        e.preventDefault();
        searchFormInput();
    });

    // Need to add onclick for history cities to be able to click

    // Need function to gather data from search input 
    function searchFormInput() {
        let cityInput = $(searchInput).val().trim();
        searchInput.value = "";
        if (!cityInput) {
            // Need to call function for modal
        } else {
            searchForWeather(cityInput);
        }
    }

    // need a call to the API
    function searchForWeather(city) {
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

        $.ajax({
            url: queryURL,
            method: "GET",
            error: function (err) {
                errorModal(err);
            }
        }).then(function (response) {
            console.log(response);
            // Function from below to update data
            updateWeather(response);
        })
    }

    // This function updates the current weather based on searched city
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
            error: function (err) {
                errorModal(err);
            }
        }).then(function (response) {
            // need another function to update the 5 day forecast & uv index (not on original call)
            updateFiveDay(response);
        });

    
    }

    // Need a function to load search history 

    // function to update the five day weather and UV index
    function updateFiveDay(data) {
        // get UV information and apply to html element
        var uvIndexInfo = data.current.uvi;
        uvIndex.innerHTML = `UV Index: ${uvIndexInfo}`;
        // set severity of UV index
        if (uvIndexInfo <= 3) {
            $(uvIndex).attr("class", "highlightGreen");
        } else if (3 < uvIndexInfo && uvIndexInfo <= 6) {
            $(uvIndex).attr("class", "highlightYellow"); 
        } else {
            $(uvIndex).attr("class", "highlightRed");
        }

        // Need to clear previous info on forecast
        $(forecastFive).empty();
        // Now update information on forecast
        for (i = 1; i < 6; i++) {
            // Grab data from API
            let fiveDayData = data.daily[i];
            // Need to again adjust for timezone
            let thatTimezone = parseInt(fiveDayData.dt) + parseInt(data.timezone_offset);
            //  Need to parse the time data to readable units
            let myTimezone = dateTime.fromSeconds(thatTimezone);
            // Append returned info to fiveday forecast panels
            $(forecastFive).append(`<div class="fiveDayCard flexcol col-1 rounded" id="card${i}"></div>`);
            // Add details of forecast
            $('#card' + i).append(`<h3 id="forecastFive" class="text-white h4 mb-3">${myTimezone.month}/${myTimezone.day}/${myTimezone.year}</h3>`)
            // Need to add images here
            // adding the temperature
            .append(`<p class="text-white">Temp: ${fiveDayData.temp.day}F°</p>`)
            // adding humidity
            .append(`<p class="text-white mb-0">Humidity: ${fiveDayData.humidity}</p>`)

        }
    }

    // Function to update the city history
    function updateHistory(city) {
        
    }

});