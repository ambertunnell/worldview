$(document).ready(function() {

    $('.clock-row').hide().fadeIn(1000);

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

 
}); 

function makeClock (cityobject){
   
    var WEATHER_API_KEY = 'c2ebf0ca079e86eb70261f70d92ce7ce';
    var URL = "https://api.forecast.io/forecast/" + WEATHER_API_KEY + "/" + cityobject.lat+","+cityobject.lon;
    var offset;
      
    var datacity = cityobject.name.toLowerCase().replace(/ /g, '').replace(/[^\w\s]/gi, '')+cityobject.id;

    // if clock 4 exists, fade it out

    $( " #clock-container " ).children('div').eq(4).replaceWith("<div class=\""+datacity+"-clock col-md-2 clock\" data-city=\""+cityobject.id+"\"><ul class=\"ul-clock\"><li class=\"exit-clock\"></li><li class=\"sec\"></li><li class=\"hour\"></li><li class=\"min\"></li></ul><center><h2>"+cityobject.name+"</h2></center></div>");

    $( " #clock-container " ).children('div').eq(4).hide();
    //SET NAME OF CITY BELOW CLOCK
    $( " #clock-container " ).children('div').eq(4).find("h2").text(cityobject.name);

    //MOVE BUILT CLOCK from 5th pos to 1st
    
    var built = $( " #clock-container " ).children('div').eq(4).detach();
    $( "#clock-container " ).prepend(built);
      
        weather = $.ajax({
            url: URL,
            dataType: 'jsonp',
            success: function (response) {
                console.log(cityobject.name + " UTC ajax success.");

                offset = response['offset'];
                console.log("   City offset: " + cityobject.name+ " " + offset);
                
                

                setInterval( function() {
                var seconds = new Date().getSeconds();
                var sdegree = seconds * 6;
                var srotate = "rotate(" + sdegree + "deg)";
                $(".clock .sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
                }, 1000 );
                
                setInterval( function() {           //SET HOUR
                var hours = clockTime(offset).getHours();
                if (hours >= 24) {
                  hours -= 24;
                } else if (hours < 0) {
                  hours -= -24;
                };
                
                var mins = clockTime(offset).getMinutes() //get min for hour hand pos
                var hdegree = hours * 30 + (mins / 2);
                var hrotate = "rotate(" + hdegree + "deg)";
                $("."+datacity+"-clock .hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate}); 
                }, 1000 );

                setInterval( function() {           //SET MINUTES
                var mins = clockTime(offset).getMinutes();
                //console.log("   City MIN setting to: " + mins + " for " + cityobject.name);
                var mdegree = mins * 6;
                var mrotate = "rotate(" + mdegree + "deg)";
                $("."+datacity+"-clock .min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate}); 
                }, 1000 );
                 
           
            $( "."+datacity+"-clock" ).fadeIn(3200,function(){});    

            },
              
            error: function (response) {
                console.log("Forecast.io API request failed in getting OFFSET");
                
            }
            
        });    
        
   }//end makeclock function

   function clockTime(cityUTCOffset){
                
                
                var today= new Date();
                var m = today.getUTCMinutes();
                var h = today.getUTCHours();

                // console.log ("  CURRENT UTC IS " + h + ":" + m);
                if (cityUTCOffset < 0){
                    var hoursOff = Math.ceil(cityUTCOffset);
                    
                } else {
                    var hoursOff = Math.floor(cityUTCOffset);
                      
                }
                var minOff = (cityUTCOffset - hoursOff) * 60;

            
                
                var cityTime =  new Date ( today );
                cityTime.setHours ( h + hoursOff);
                cityTime.setMinutes ( m + minOff);
                return cityTime;
                
   }


