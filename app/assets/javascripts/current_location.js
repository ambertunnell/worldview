$(function(){

  $(".ul-clock").click(function () {

    var location = $(this).closest(".clock").data('city');

    if (location === "hongkong"){
      var newLocation = "hong kong";
    } else {
      var newLocation = location;
    }
    
    $('#current-location').empty();
    $('#current-location').append("<li><a> current location: " + newLocation + "</a></li>");

  });

});