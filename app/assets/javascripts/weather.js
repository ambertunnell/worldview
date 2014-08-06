$(function () {

    var WEATHER_API_KEY = 'c2ebf0ca079e86eb70261f70d92ce7ce';

    var nyc_coords = "40.712784,-74.005941",
        london_coords = "51.507351,-0.127758",
        beijing_coords = "39.909066,116.415054",
        sydney_coords = "-33.867487,151.20699",
        paris_coords = "48.856614,2.352222";

    $(".clock img").click(function() {
        var location = $(this).closest(".clock").data('city');
        $(".weather").empty();

        switch (location) {
            case 'nyc':
                coords = nyc_coords;
                break;
            case 'london':
                coords = london_coords;
                break;
            case 'beijing':
                coords = beijing_coords;
                break;
            case 'sydney':
                coords = sydney_coords;
                break;
            case 'paris':
                coords = paris_coords;
                break;
        }

        var URL = "https://api.forecast.io/forecast/" + WEATHER_API_KEY + "/" + coords;

        weather = $.ajax({
            url: URL,
            dataType: 'jsonp',
            success: function (response) {
                var place = response['timezone'];
                var continent = (/.*\//).exec(place)[0].replace("/", "");
                var city = place.replace(/.*\//, "").replace("_", " ");

                if (city === "Shanghai") {
                    city = "Beijing";
                }

                var locale = city + " | " + continent,
                    temp = response['currently']['temperature'],
                    summary = response['currently']['summary'],
                    precipitation = response['currently']['precipProbability'];

                $(".weather").append('<br><p>' + temp + ' Degrees - ' + summary + ' - ' + precipitation + '% Chance of Rain</p>');
                // console.log(response);
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