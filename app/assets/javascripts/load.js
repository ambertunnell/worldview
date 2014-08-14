var loggedIn;
var userCities;
var userCity;

$(function () {
  //things to hide on load

  $('.weather-header h4').hide();
  $('#flickr').hide();
  $('.divider').hide();
  $('.about').hide();
  $('footer').hide();

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



  //listeners
  $('.clock-row').on('click', '.ul-clock', function(){
    var city_id = $(this).closest(".clock").data('city');

    $('.divider').show();
    $('.about').show();
    $('footer').show();



    $.ajax({
      type: "POST",
      data: {id: city_id},
      url: '/cities/get_city', //will get city info and also updated info on users articles, photots and tweets 
      success: function(response){
        userCity = response.city;
        article(response.city);
        weather1(response.city);
        photos(response.city);
        tweets(response.city);
        var newLocation = (response.city.name + ", " + response.city.bigger_thing).toUpperCase();
        $('#current-location').empty();
        $('#current-location').append("<li><a> CURRENT LOCATION: " + newLocation + "</a></li>");

        //update users vars so that save buttons will reflect saves. 
        userArticles = response.user_vars.articles;
        userPhotos = response.user_vars.photos;
        userTweets = response.user_vars.tweets;
      },
      error: function(response){
        console.log("Clock clicking failed - could not post to cities/get_city");
      }

    })



        // scroll to anchor on initial click
        var target = $('#weather-anchor');
        if( target.length ) {
            $('html, body').animate({
                scrollTop : target.offset().top
            }, 1500);
        }
    
  });
});



