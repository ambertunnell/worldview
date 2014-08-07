$(function () {

$('.weather-header').hide();

    var WEATHER_API_KEY = 'c2ebf0ca079e86eb70261f70d92ce7ce';

    var nyc_coords = "40.712784,-74.005941",
        london_coords = "51.507351,-0.127758",
        hongkong_coords = "22.396428,114.10949700000003", 
        sydney_coords = "-33.867487,151.20699",
        paris_coords = "48.856614,2.352222";
        sanfran_coords = "37.7749295,-122.41941550000001"; 

    $(".ul-clock").click(function() {

        $('.weather-header').show();
        $(".weather").empty();

        var location = $(this).closest(".clock").data('city');
       
        switch (location) {
            case 'nyc':
                coords = nyc_coords;
                break;
            case 'london':
                coords = london_coords;
                break;
            case 'hongkong':
                coords = hongkong_coords;
                break;
            case 'sydney':
                coords = sydney_coords;
                break;
            case 'paris':
                coords = paris_coords;
                break;
            case 'sanfran':
                coords = sanfran_coords;
                break;
        }

        var URL = "https://api.forecast.io/forecast/" + WEATHER_API_KEY + "/" + coords;

        weather = $.ajax({
            url: URL,
            dataType: 'jsonp',
            success: function (response) {
                // console.log(response);

                var place = response['timezone'];
                var continent = (/.*\//).exec(place)[0].replace("/", "");
                var city = place.replace(/.*\//, "").replace("_", " ");
                var icon = response.currently.icon;
                var formatted_icon = response.currently.icon.toUpperCase().split("-").join("_");
                // console.log(formatted_icon);
                // if (city === "Shanghai") {
                //     city = "Beijing";
                // }

                var locale = city + " | " + continent,
                    temp = response['currently']['temperature'],
                    summary = response['currently']['summary'],
                    precipitation = response['currently']['precipProbability']*100;

                var skycons = new Skycons({
                    "color": "black"});
                // $(".weather").append(skycons.add("icon1", icon));
                $(".weather").append('<br><p><canvas id="icon1" width="50" height="50">'+skycon_anim+'</canvas>' + temp + ' Degrees - ' + summary + ' - ' + precipitation + '% Chance of Rain</p>');
                switch (icon) {
                    case 'partly-cloudy-night':
                        var skycon_anim = skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
                        break;
                    case 'partly-cloudy-day':
                        var skycon_anim = skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
                        break;
                    case 'clear-day':
                        var skycon_anim = skycons.add("icon1", Skycons.CLEAR_DAY);
                        break;
                    case 'clear-night':
                        var skycon_anim = skycons.add("icon1", Skycons.CLEAR_NIGHT);
                        break;
                    case 'cloudy':
                        var skycon_anim = skycons.add("icon1", Skycons.CLOUDY);
                        break;
                    case 'rain':
                        var skycon_anim = skycons.add("icon1", Skycons.RAIN);
                        break;
                    case 'sleet':
                        var skycon_anim = skycons.add("icon1", Skycons.SLEET);
                        break;
                    case 'snow':
                        var skycon_anim = skycons.add("icon1", Skycons.SNOW);
                        break;
                    case 'wind':
                        var skycon_anim = skycons.add("icon1", Skycons.WIND);
                        break;
                    case 'fog':
                        var skycon_anim = skycons.add("icon1", Skycons.FOG);
                        break;
                };

                // skycons.set("icon1", Skycons.formatted_icon);
                // console.log(formatted_icon);
                skycons.play();

                $(".weather p").animate({

                    left: "+=50",
                    // right: "+=50",
                    // height: "toggle"
                }, 700, function() {
                    // console.log("// Animation complete.");
                  });
            },
            error: function (response) {
                console.log("Forecast.io API request failed");
            }
        });
    });

});