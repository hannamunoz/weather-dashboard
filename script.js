$( document ).ready(function() {
//     let endpoint = 'https://api.linkpreview.net'
//     let apiKey = '5b578yg9yvi8sogirbvegoiufg9v9g579gviuiub8 13659ca4a2177fdbcfbf8f91bf870bd9'
  
//     $( ".content a" ).each(function( index, element ) {
  
//       $.ajax({
//           url: endpoint + "?key=" + apiKey + " &q=" + $( this ).text(),
//           contentType: "application/json",
//           dataType: 'json',
//           success: function(result){
//               console.log(result);
//           }, error: function(error) {
//             console.log(error);
//         }
//       })
//     });
//   });

  var searchBtn = document.getElementById('searchButton');
  var searchInput = document.getElementById('searchValue');
  var cityName = document.getElementById('cityName');
  var temp = document.getElementById('temp');
  var humidity = document.getElementById('humid');
  var wind = document.getElementById('wind');
  var uvIndex = document.getElementById('uv');
  var searchHist = [];

searchBtn.addEventListener('click', function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+searchInput.value+'&appid=13659ca4a2177fdbcfbf8f91bf870bd9')
    .then(response => response.json())
    .then(data => console.log(data))

.catch(error => alert('Please enter a city name'))
})

});

// need an onclick for searchBtn that updates the history