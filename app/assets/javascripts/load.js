var loggedIn;
var userCities;

$(function () {
  //things to hide on load

  $('.weather-header').hide();
  $('#flickr').hide();

  $.ajax({
        type: "GET",
        url: "/users/get_cities",
        success: function (response2) {
          userCities = response2;
          console.log("get cities ajax request succeeded. ");
          for (i =0; i< response2.length; i++){
            makeClock(response2[i]);
          }
          
        },
        error: function (response2){
          console.log("Error could not retrieve user information.");
          loggedIn = false;
        }
    });


  // $.ajax({
  //           type: "GET",
  //           url: "/users/signed_in",
  //           success: function (response) {
  //             console.log("Sign_in AJAX request succeeded.");
  //             if (response == true){
  //               console.log("Show like button - A user is logged in.")
  //               loggedIn = true;
  //               // create clocks for the user's cities
  //    // end inner ajax
  //             } else {
  //               loggedIn = false;
  //               // create clocks for the five default cities
  //             }
  //           },
  //           error: function (response){
  //             console.log("Error could not retrieve user information.");
  //             loggedIn = false;
  //           }
  //       }); 

  //listeners
  $('.clock-row').on('click', '.ul-clock', function(){
    var city_id = $(this).closest(".clock").data('city');

    $.ajax({
      type: "POST",
      data: {id: city_id},
      url: '/cities/get_city',
      success: function(response){
        article(response);
        weather1(response);
        photos(response);
        tweets(response);
        var newLocation = (response.name + ", " + response.bigger_thing).toUpperCase();
        $('#current-location').empty();
        $('#current-location').append("<li><a> CURRENT LOCATION: " + newLocation + "</a></li>");
      },
      error: function(response){
        console.log("Clock clicking failed - could not post to cities/get_city");
      }

    })


    //set navbar loc
    // var location = $(this).closest(".clock").data('city');

    // if (location === "hongkong"){
    //   var newLocation = "HONG KONG";
    // } else if (location === "newyork"){
    //   var newLocation = "NEW YORK";
    // } else {
    //   var newLocation = location.toUpperCase();
    // }
    
  });
});



