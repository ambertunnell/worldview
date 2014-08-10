var loggedIn;
$(function () {
  //things to hide on load

  $('.weather-header').hide();
  $('#flickr').hide();

  $.ajax({
            type: "GET",
            url: "/users/signed_in",
            success: function (response) {
              console.log("Sign_in AJAX request succeeded.");
              if (response == true){
                console.log("Show like button - A user is logged in.")
                loggedIn = true;
                // create clocks for the user's cities
                      $.ajax({
                          type: "GET",
                          url: "/users/get_cities",
                          success: function (response2) {
                            console.log("get cities ajax request succeeded. ");
                            for (i =0; i< response2.length; i++){
                              makeClock(response2[i]);
                            }
                            
                          },
                          error: function (response2){
                            console.log("Error could not retrieve user information.");
                            loggedIn = false;
                          }
                      }); // end inner ajax
              } else {
                loggedIn = false;
                // create clocks for the five default cities
              }
            },
            error: function (response){
              console.log("Error could not retrieve user information.");
              loggedIn = false;
            }
        }); 

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



