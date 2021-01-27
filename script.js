$( document ).ready(function() {
    let endpoint = 'https://api.linkpreview.net'
    let apiKey = '5b578yg9yvi8sogirbvegoiufg9v9g579gviuiub8'
  
    $( ".content a" ).each(function( index, element ) {
  
      $.ajax({
          url: endpoint + "?key=" + apiKey + " &q=" + $( this ).text(),
          contentType: "application/json",
          dataType: 'json',
          success: function(result){
              console.log(result);
          }, error: function(error) {
            console.log(error);
        }
      })
    });
  });

  var searchBtn = document.getElementById('searchButton');
  var searchInput = document.getElementById('searchValue');
  var cityName = document.getElementById('cityName');
  var temp = document.getElementById('temp');
  var humidity = document.getElementById('humid');
  var wind = document.getElementById('wind');
  var uvIndex = document.getElementById('uv');

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&${apiKey}}`)
    .then(response = response.json)