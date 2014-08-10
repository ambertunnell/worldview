
$(function () {
  //things to hide on load

  $('.weather-header').hide();
  $('#flickr').hide();



  //listeners
  $('.clock-row').on('click', '.ul-clock', function(){
    var location = $(this).closest(".clock").data('city');
    console.log(location);
    article(location);
    weather1(location);
    photos(location);
    tweets(location);

    //set navbar loc
    var location = $(this).closest(".clock").data('city');

    if (location === "hongkong"){
      var newLocation = "HONG KONG";
    } else if (location === "newyork"){
      var newLocation = "NEW YORK";
    } else {
      var newLocation = location.toUpperCase();
    }
    
    $('#current-location').empty();
    $('#current-location').append("<li><a> CURRENT LOCATION: " + newLocation + "</a></li>");
  });
});

