// script nav fade in and out
(function($) {
    $(document).ready(function(){

        $(window).scroll(function(){
            if ($(this).scrollTop() > 200) {
                $('nav').fadeIn(400);
            } else {
                $('nav').fadeOut(400);
            }
        });

    });
})(jQuery);

$(document).ready(function(){

    // scroll to anchors element script
    $('a[href^="#top"]').on('click', function(event) {
        var target = $( $(this).attr('href') );
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // scroll to anchors element script
    $('a[href^="#weather-anchor"]').on('click', function(event) {
        var target = $( $(this).attr('href') );
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // scroll to anchors element script
    $('a[href^="#weather-anchor"]').on('click', function(event) {
        var target = $( $(this).attr('href') );
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // scroll to anchors element script
    $('a[href^="#photos-anchor"]').on('click', function(event) {
        var target = $( $(this).attr('href') );
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // scroll to anchors element script
    $('a[href^="#news-anchor"]').on('click', function(event) {
        var target = $( $(this).attr('href') );
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // scroll to anchors element script
    $('a[href^="#tweets-anchor"]').on('click', function(event) {
        var target = $( $(this).attr('href') );
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
});




