$( document ).ready(function() {

  var searchBtn = document.getElementById('searchButton');
  var searchInput = document.getElementById('searchValue');
  var cityName = document.getElementById('cityName');
  var temp = document.getElementById('temp');
  var humidity = document.getElementById('humid');
  var wind = document.getElementById('wind');
  var uvIndex = document.getElementById('uv');
  var searchHist = [];
  var apiKey = '13659ca4a2177fdbcfbf8f91bf870bd9'


// need an onclick for searchBtn that updates the history
// $(searchBtn).on('click', updateHistory);

// Need to add onclick for history cities to be able to click

// need a call to the API
function searchForWeather() {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        error: function(err) {
            errorModal(err);
        }
    }).then(function(response) {
        console.log(response);
        // Need a function here to update all the information on the page
    })
}
});

function updateWeather(data) {
    // Need to update the time to current timezone else current days could get confused
    let rawTimezone = parseInt(data.dt) + parseInt(data.timezone);
    let ourTimezone = DateTime.fromSeconds(rawTimezone);

    // Set weather information to locations on html
    cityName.innerHTML = data.name + ' ' + ourTimezone.month + '/' + ourTimezone.day + '/' + ourTimezone.year;
}