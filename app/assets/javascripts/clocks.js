$(document).ready(function() {

    $('.clock-row').hide().fadeIn(3000);

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

var nyc_coords = "40.712784,-74.005941",
        london_coords = "51.507351,-0.127758",
        hongkong_coords = "22.396428,114.10949700000003", 
        sydney_coords = "-33.867487,151.20699",
        paris_coords = "48.856614,2.352222",
        sanfran_coords = "37.7749295,-122.41941550000001"; 

     makeClock("New York", nyc_coords);
     makeClock("London", london_coords);
     makeClock("Hong Kong", hongkong_coords);
     makeClock("Sydney", sydney_coords);
     makeClock("Paris", paris_coords);
    
 
}); 

function makeClock (city,coords){
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
                console.log(city + " UTC ajax success");
                var datacity = city.toLowerCase().replace(/ /, '');
                
                $( " #clock-container " ).children('div').eq(4).replaceWith("<div class=\""+datacity+"-clock col-md-2 clock\" data-city=\""+datacity+"\"><ul class=\"ul-clock\"><li class=\"exit-clock\"></li><li class=\"sec\"></li><li class=\"hour\"></li><li class=\"min\"></li></ul><center><h2>"+city+"</h2></center></div>");
                $( " #clock-container " ).children('div').eq(4).hide();

                offset = response['offset'];
                setInterval( function() {
                var seconds = new Date().getSeconds();
                var sdegree = seconds * 6;
                var srotate = "rotate(" + sdegree + "deg)";
                $("."+datacity+"-clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
                }, 1000 );
                
                setInterval( function() {
                var hours = UTChour + offset;
                if (hours >= 24) {
                  hours -= 24;
                } else if (hours < 0) {
                  hours -= -24;
                };
                
                var mins = new Date().getMinutes();
                var hdegree = hours * 30 + (mins / 2);
                var hrotate = "rotate(" + hdegree + "deg)";
                $("."+datacity+"-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate}); 
                }, 1000 );

                setInterval( function() {
                var mins = new Date().getMinutes();
                var mdegree = mins * 6;
                var mrotate = "rotate(" + mdegree + "deg)";
                $("."+datacity+"-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate}); 
                }, 1000 );
                $( " #clock-container " ).children('div').eq(4).find("h2").text(city);
                $( " #clock-container " ).children('div').eq(4).show();
                var built =  $( " #clock-container " ).children('div').eq(4).detach();
                $( "#clock-container " ).prepend(built);
                

            },
              
            error: function (response) {
                console.log("Forecast.io API request failed in getting OFFSET");
                
            }
            
        });    
        
   }//end makeclock function


