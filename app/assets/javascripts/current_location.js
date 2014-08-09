$(function(){

  $(".ul-clock").click(function () {

    var location = $(this).closest(".clock").data('city');

    if (location === "hongkong"){
      var newLocation = "HONG KONG";
    } else {
      var newLocation = location.toUpperCase();
    }
    
    $('#current-location').empty();
    $('#current-location').append("<li><a> CURRENT LOCATION: " + newLocation + "</a></li>");

  });

});