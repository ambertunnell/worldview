$(document).ready(function() {


    $('.clock-row').hide().fadeIn(3000);

    // console.log($(".ul-clock").html());

    // $('.exit-clock').on("click", function() {
    //     // alert("this is "+$(this));
    //     $(this).closest($('.ul-clock')).hide();
    //     $(this).closest("div").find("center h2").hide();
    //     $(this).closest($('.ul-clock')).parent('div').append("Select a city<form action=''><select name='cars'><option value='select'>--Select an option--</option><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='fiat'>Fiat</option><option value=;audi;>Audi</option></select></form>");
    // });


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


    

//use $( "#clock-container " ).children('div').eq(0);
   function makeClock (city,coords){
       // var $clock1 = $("#clock-container > div")[0];
       // var $clock2 = $("#clock-container > div")[1];
       // var $clock3 = $("#clock-container > div")[2];
       // var $clock4 = $("#clock-container > div")[3];
       // var $clock5 = $("#clock-container > div")[4];
        // $( " #clock-container " ).children('div').eq(4).hide();
        var d = new Date ();
        var n = d.getTimezoneOffset();
        var UTChour = d.getUTCHours();

        var WEATHER_API_KEY = 'c2ebf0ca079e86eb70261f70d92ce7ce';
        var URL = "https://api.forecast.io/forecast/" + WEATHER_API_KEY + "/" + coords;
        var offset;
        weather = $.ajax({
            url: URL,
            dataType: 'jsonp',
            success: function (response) {
                console.log(city + " ajax success");
                offset = response['offset'];
                setInterval( function() {
                var seconds = new Date().getSeconds();
                var sdegree = seconds * 6;
                var srotate = "rotate(" + sdegree + "deg)";
                $( " #clock-container " ).children('div').eq(4).find(".sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
                }, 1000 );
                
                setInterval( function() {
                var hours = UTChour + offset;
                if (hours >= 24) {
                  hour -= 24;
                } else if (hours < 0) {
                  hours -= -24;
                };
                // var hours = getTimezoneOffset
                var mins = new Date().getMinutes();
                var hdegree = hours * 30 + (mins / 2);
                var hrotate = "rotate(" + hdegree + "deg)";
                $( " #clock-container " ).children('div').eq(4).find(".hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate}); 
                }, 1000 );

                setInterval( function() {
                var mins = new Date().getMinutes();
                var mdegree = mins * 6;
                var mrotate = "rotate(" + mdegree + "deg)";
                $( " #clock-container " ).children('div').eq(4).find(".min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate}); 
                }, 1000 );
                $( " #clock-container " ).children('div').eq(4).find("h2").text(city);
                
                // var built =  $( " #clock-container " ).children('div').eq(4).detach();
                // $( "#clock-container " ).prepend(built);
            },
              
            error: function (response) {
                console.log("Forecast.io API request failed in getting OFFSET");
                
            }
            
        });

        
        
   }//end makeclock function

  //new clock goes on left
  //move all clocks right 
  //make a new one on left  
var nyc_coords = "40.712784,-74.005941",
        london_coords = "51.507351,-0.127758",
        hongkong_coords = "22.396428,114.10949700000003", 
        sydney_coords = "-33.867487,151.20699",
        paris_coords = "48.856614,2.352222",
        sanfran_coords = "37.7749295,-122.41941550000001"; 

    // NEW YORK

     makeClock("New York", nyc_coords);
     makeClock("London", london_coords);
     // makeClock("Hong Kong", hongkong_coords);
     // makeClock("Sydney", sydney_coords);
     // makeClock("Paris", paris_coords);

    

    // SAN FRANCISCO
     // makeClock(-7,$(".sanfran-clock .sec"), $(".sanfran-clock .min") ,$(".sanfran-clock .hour"));


    // // LONDON

    // setInterval( function() {
    // var seconds = new Date().getSeconds();
    // var sdegree = seconds * 6;
    // var srotate = "rotate(" + sdegree + "deg)";
    // $(".london-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});  
    // }, 1000 );

    // setInterval( function() {
    // var hours = UTChour + 1;
    // if (hours >= 24) {
    //   hours -= 24;
    // } else if (hours < 0) {
    //   hours -= -24;
    // };
    // // var hours = new Date().getHours();
    // var mins = new Date().getMinutes();
    // var hdegree = hours * 30 + (mins / 2);
    // var hrotate = "rotate(" + hdegree + "deg)";
    // $(".london-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});  
    // }, 1000 );

    // setInterval( function() {
    // var mins = new Date().getMinutes();
    // var mdegree = mins * 6;
    // var mrotate = "rotate(" + mdegree + "deg)";
    // $(".london-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate}); 
    // }, 1000 );

    // PARIS

    // setInterval( function() {
    // var seconds = new Date().getSeconds();
    // var sdegree = seconds * 6;
    // var srotate = "rotate(" + sdegree + "deg)";
    // $(".paris-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});  
    // }, 1000 );

    // setInterval( function() {
    // var hours = UTChour + 2;
    // if (hours >= 24) {
    //   hours -= 24;
    // } else if (hours < 0) {
    //   hours -= -24;
    // };
    // // var hours = new Date().getHours();
    // var mins = new Date().getMinutes();
    // var hdegree = hours * 30 + (mins / 2);
    // var hrotate = "rotate(" + hdegree + "deg)";
    // $(".paris-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate}); 
    // }, 1000 );

    // setInterval( function() {
    // var mins = new Date().getMinutes();
    // var mdegree = mins * 6;
    // var mrotate = "rotate(" + mdegree + "deg)";
    // $(".paris-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate}); 
    // }, 1000 );

    // HONG KONG

    // setInterval( function() {
    // var seconds = new Date().getSeconds();
    // var sdegree = seconds * 6;
    // var srotate = "rotate(" + sdegree + "deg)";
    // $(".hongkong-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});  
    // }, 1000 );

    // setInterval( function() {
    // var hours = UTChour + 8;
    // if (hours >= 24) {
    //   hours -= 24;
    // } else if (hours < 0) {
    //   hours -= -24;
    // };
    // // var hours = new Date().getHours();
    // var mins = new Date().getMinutes();
    // var hdegree = hours * 30 + (mins / 2);
    // var hrotate = "rotate(" + hdegree + "deg)";
    // $(".hongkong-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});  
    // }, 1000 );

    // setInterval( function() {
    // var mins = new Date().getMinutes();
    // var mdegree = mins * 6;
    // var mrotate = "rotate(" + mdegree + "deg)";
    // $(".hongkong-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});   
    // }, 1000 );

    // // SYDNEY

    // setInterval( function() {
    // var seconds = new Date().getSeconds();
    // var sdegree = seconds * 6;
    // var srotate = "rotate(" + sdegree + "deg)";
    // $(".sydney-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});  
    // }, 1000 );

    // setInterval( function() {
    // var hours = UTChour + 10;
    // if (hours >= 24) {
    //   hours -= 24;
    // } else if (hours < 0) {
    //   hours -= -24;
    // };
    // // var hours = new Date().getHours();
    // var mins = new Date().getMinutes();
    // var hdegree = hours * 30 + (mins / 2);
    // var hrotate = "rotate(" + hdegree + "deg)";
    // $(".sydney-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});  
    // }, 1000 );

    // setInterval( function() {
    // var mins = new Date().getMinutes();
    // var mdegree = mins * 6;
    // var mrotate = "rotate(" + mdegree + "deg)";
    // $(".sydney-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});  
    // }, 1000 );
 
}); 