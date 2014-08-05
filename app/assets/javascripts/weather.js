$(function () {

  // var WEATHER_API KEY = c2ebf0ca079e86eb70261f70d92ce7ce;

  var URL = "https://api.forecast.io/forecast/c2ebf0ca079e86eb70261f70d92ce7ce/37.8267,-122.423";

  weather = $.ajax({
    url: URL,
    dataType: 'jsonp',
    success: function(response) {
      var locale = response['timezone']
          temp = response['currently']['temperature'],
          summary = response['currently']['summary'],
          precipitation = response['currently']['precipProbability'];
      $(".weather").append('<br> In '+locale+'<br>');
      $(".weather").append('<br>'+temp+' Degrees - ');
      $(".weather").append(summary+' - ');
      $(".weather").append(precipitation+'% Chance of Rain');
      console.log(response)
    },
    error: function(response) {
      console.log("error")
    },

  });
  
})
