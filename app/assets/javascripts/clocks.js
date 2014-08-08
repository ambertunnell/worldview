$(document).ready(function() {

    $('.clock-row').hide().fadeIn(2000);

    // script to type text in header
    var text = '         Click a clock.    ';

    // text is split up to letters
    $.each(text.split(''), function(i, letter){

        // add 100*i ms delay to each letter 
        setTimeout(function(){

            // add the letter to the container
            $('.instructions h2').html($('.instructions h2').html() + letter);

          }, 130*i);

        $('.instructions h2').show().delay(3500).fadeOut();
    });

    var d = new Date ();
    var n = d.getTimezoneOffset();
    var UTChour = d.getUTCHours();

    // NEW YORK

    setInterval( function() {
    var seconds = new Date().getSeconds();
    var sdegree = seconds * 6;
    var srotate = "rotate(" + sdegree + "deg)";
    $(".nyc-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
    }, 1000 );
    
    setInterval( function() {
    var hours = UTChour - 4;
    if (hours >= 24) {
      hour -= 24;
    } else if (hours < 0) {
      hours -= -24;
    };
    // var hours = getTimezoneOffset
    var mins = new Date().getMinutes();
    var hdegree = hours * 30 + (mins / 2);
    var hrotate = "rotate(" + hdegree + "deg)";
    $(".nyc-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate}); 
    }, 1000 );

    setInterval( function() {
    var mins = new Date().getMinutes();
    var mdegree = mins * 6;
    var mrotate = "rotate(" + mdegree + "deg)";
    $(".nyc-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate}); 
    }, 1000 );

    // SAN FRANCISCO

    setInterval( function() {
    var seconds = new Date().getSeconds();
    var sdegree = seconds * 6;
    var srotate = "rotate(" + sdegree + "deg)";
    $(".sanfran-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});  
    }, 1000 );

    setInterval( function() {
    var hours = UTChour - 7;
    if (hours >= 24) {
      hours -= 24;
    } else if (hours < 0) {
      hours -= -24;
    };
    // var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var hdegree = hours * 30 + (mins / 2);
    var hrotate = "rotate(" + hdegree + "deg)";
    $(".sanfran-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate}); 
    }, 1000 );

    setInterval( function() {
    var mins = new Date().getMinutes();
    var mdegree = mins * 6;
    var mrotate = "rotate(" + mdegree + "deg)";
    $(".sanfran-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});
    }, 1000 );

    // LONDON

    setInterval( function() {
    var seconds = new Date().getSeconds();
    var sdegree = seconds * 6;
    var srotate = "rotate(" + sdegree + "deg)";
    $(".london-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});  
    }, 1000 );

    setInterval( function() {
    var hours = UTChour + 1;
    if (hours >= 24) {
      hours -= 24;
    } else if (hours < 0) {
      hours -= -24;
    };
    // var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var hdegree = hours * 30 + (mins / 2);
    var hrotate = "rotate(" + hdegree + "deg)";
    $(".london-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});  
    }, 1000 );

    setInterval( function() {
    var mins = new Date().getMinutes();
    var mdegree = mins * 6;
    var mrotate = "rotate(" + mdegree + "deg)";
    $(".london-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate}); 
    }, 1000 );

    // PARIS

    setInterval( function() {
    var seconds = new Date().getSeconds();
    var sdegree = seconds * 6;
    var srotate = "rotate(" + sdegree + "deg)";
    $(".paris-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});  
    }, 1000 );

    setInterval( function() {
    var hours = UTChour + 2;
    if (hours >= 24) {
      hours -= 24;
    } else if (hours < 0) {
      hours -= -24;
    };
    // var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var hdegree = hours * 30 + (mins / 2);
    var hrotate = "rotate(" + hdegree + "deg)";
    $(".paris-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate}); 
    }, 1000 );

    setInterval( function() {
    var mins = new Date().getMinutes();
    var mdegree = mins * 6;
    var mrotate = "rotate(" + mdegree + "deg)";
    $(".paris-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate}); 
    }, 1000 );

    // HONG KONG

    setInterval( function() {
    var seconds = new Date().getSeconds();
    var sdegree = seconds * 6;
    var srotate = "rotate(" + sdegree + "deg)";
    $(".hongkong-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});  
    }, 1000 );

    setInterval( function() {
    var hours = UTChour + 8;
    if (hours >= 24) {
      hours -= 24;
    } else if (hours < 0) {
      hours -= -24;
    };
    // var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var hdegree = hours * 30 + (mins / 2);
    var hrotate = "rotate(" + hdegree + "deg)";
    $(".hongkong-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});  
    }, 1000 );

    setInterval( function() {
    var mins = new Date().getMinutes();
    var mdegree = mins * 6;
    var mrotate = "rotate(" + mdegree + "deg)";
    $(".hongkong-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});   
    }, 1000 );

    // SYDNEY

    setInterval( function() {
    var seconds = new Date().getSeconds();
    var sdegree = seconds * 6;
    var srotate = "rotate(" + sdegree + "deg)";
    $(".sydney-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});  
    }, 1000 );

    setInterval( function() {
    var hours = UTChour + 10;
    if (hours >= 24) {
      hours -= 24;
    } else if (hours < 0) {
      hours -= -24;
    };
    // var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var hdegree = hours * 30 + (mins / 2);
    var hrotate = "rotate(" + hdegree + "deg)";
    $(".sydney-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});  
    }, 1000 );

    setInterval( function() {
    var mins = new Date().getMinutes();
    var mdegree = mins * 6;
    var mrotate = "rotate(" + mdegree + "deg)";
    $(".sydney-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});  
    }, 1000 );
 
}); 