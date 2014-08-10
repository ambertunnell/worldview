
$(function () {
  //things to hide on load
  $('.news-header').hide();
  $('.weather-header').hide();
  $('.photos-header').hide();
  $('#flickr').hide();
  $('.twitter-header').hide();


  //listeners
  $('.clock-row').on('click', '.ul-clock', function(){
    var location = $(this).closest(".clock").data('city');
    console.log(location);
    article(location);
    weather1(location);
    photos(location);
    tweets(location);
  });
});

