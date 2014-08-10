$(document).ready(function(){

    $('.clock-row').on('click', function(event) {
        var target = $('#weather-anchor');
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
});