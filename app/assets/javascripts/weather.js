$(function () {

  var WEATHER_API_KEY = 'c2ebf0ca079e86eb70261f70d92ce7ce';

  var nyc_coords = "40.712784,-74.005941",
      london_coords = "51.507351,-0.127758",
      beijing_coords = "39.909066,116.415054",
      sydney_coords = "-33.867487,151.20699",
      paris_coords = "48.856614,2.352222";

  $(".clock img").click(function() {
    var location = $(this).closest(".clock").data('city');
    switch (location){
      case 'nyc':
        coords = nyc_coords
        break;
      case 'london':
        coords = london_coords
        break;
      case 'beijing':
        coords = beijing_coords
        break;
      case 'sydney':
        coords = sydney_coords
        break;
      case 'paris':
        coords = paris_coords
        break;
    };
    
  var URL = "https://api.forecast.io/forecast/"+WEATHER_API_KEY+"/"+coords;

  weather = $.ajax({
    url: URL,
    dataType: 'jsonp',
    success: function(response) {
      var place = response['timezone'],
          continent = (/.*\//).exec(place)[0].replace("/",""),
               city = place.replace(/.*\//,"").replace("_"," ");
         if (city === "Shanghai"){
          city = "Beijing";
         };
         var locale = city + " | " + continent,
               temp = response['currently']['temperature'],
            summary = response['currently']['summary'],
      precipitation = response['currently']['precipProbability'];
      $(".weather").empty().append('<h3>Weather</h3><br>' + locale + '<br><br>' + temp + ' Degrees - ' + summary +' - ' + precipitation + '% Chance of Rain');
      console.log(response)
    },
    error: function(response) {
      console.log("Forecast.io API request failed")
    },

  });

  });
  
})

// $(function() {
  
// });




