$(function () {

  $('.divider').hide();
  $('.about').hide();
  $('footer').hide();

  $(".clock-row").click(function () {
    $('.divider').show();
    $('.about').show();
    $('footer').show();
  });

});