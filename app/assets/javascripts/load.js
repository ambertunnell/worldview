
$(function () {
  //things to hide on load
  $('.news-header').hide();
  //listeners
  $('.clock-row').on('click', '.ul-clock', function(){
    var location = $(this).closest(".clock").data('city');
    console.log(location);
    article(location);
  });
});

