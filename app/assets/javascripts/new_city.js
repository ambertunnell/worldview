function submit_new_city(passedInput) {
    console.log("submitted " + passedInput);
    if (passedInput !== undefined) {
        var user_input = passedInput;
    } else if ($("#new-city").val() == "") {
        $("#invalid_city").text("Input must not be blank");
        console.log("Input was blank");
        return false;
    } else if (parseInt($("#new-city").val()) * 0 === 0) {
        console.log("Input is a number and not a valid city");
        $("#invalid_city").text("Letters only, please");
        console.log(("result: " + parseInt($("#new-city").val()) % 2));
        return false;
    } else {
        var user_input = $("#new-city").val();
    }

    $("#invalid_city").text(" ");
    $("#invalid_city").append("<span class = 'space'>&nbsp;</span>");

    var user_input = $("#new-city").val();

    console.log("submitted via ajax: " + user_input);

    function city_results(json) {
        console.log("city results wooo");
    }

    $.ajax({
        type: "GET",
        jsonpCallback: "city_results",
        url: "http://autocomplete.wunderground.com/aq?cb=city_results&query=" + user_input,
        dataType: 'jsonp',
        success: function(response) {
          var i = 0;

          function findCityArray(i) {
              if (response.RESULTS.length === 0){
                $("#invalid_city").text("Please enter a valid city");
                console.log("Successful response and marked as undefined, nothing in the results array")
                console.log("response: "+response.RESULTS[i]);
                return;
              } else if (response.RESULTS[i].type === "country" || response.RESULTS[i].lon === "-9999.000000") {
                $("#invalid_city").text("Please enter a city and country");
                console.log("Successful response and marked as a country, not a city");
                console.log("response: "+response.RESULTS[i]);
                return;
              } else if (response.RESULTS[i].name.match(/(international|hospital|helistop|S\.A\.R|de Olivenca|do Potengi)/i)) {
                console.log("Successful response and marked as an International airport, not a city");
                console.log("response: "+response.RESULTS[i].name);
                console.log("value of i = "+i++);
                return findCityArray(i++);
              } else {
                var first_result = response.RESULTS[i].name;
                console.log(response);
                console.log(response.RESULTS);
                var cityname = first_result.match(/(\D+)(,\s+)(\D+)/)[1];
               
                var bigger_thing = first_result.match(/(\D+)(,\s+)(\D+)/)[3];
                var lat = response.RESULTS[i].lat;
                var lon = response.RESULTS[i].lon;
                var country = response.RESULTS[i].c;
                var lastClock = $(" #clock-container ").children('div').eq(4).data('city');
                console.log("new city form success: " + first_result + ". Cityname = " + cityname + " and bigger thing= " + bigger_thing);
                return [cityname, bigger_thing, lat, lon, country, lastClock];
                }

            }
                
                var cityArray = findCityArray(i);

                console.log("city name: "+cityArray[0]);
                console.log("last clock: "+cityArray[5]);

                $("#new-city").val("");
                console.log("finished");

            // if (loggedIn == true) {

                $.ajax({
                    type: "POST",
                    url: "/cities",
                    data: {
                        city: {
                            name: cityArray[0],
                            bigger_thing: cityArray[1],
                            lat: cityArray[2],
                            lon: cityArray[3],
                            country: cityArray[4],
                            lastClock: cityArray[5]
                        }
                    },
                    success: function (response) {
                        if (response == "this city already exists") {
                            $("#invalid_city").text("You're already tracking that city");
                            console.log("Saving city denied - city is already on page.");
                        } else {
                            $("#invalid_city").text(cityArray[0] + ", " + cityArray[1] + " added");
                            console.log("Saving city successful: " + response);
                            
                            makeClock(response);

                        }
                    },
                    error: function (response) {
                        console.log("Saving city failed.");
                        console.log(response);
                    }
                });
            // }
        },
        error: function (response) {
            console.log("new city form failure: " + response);
            $("#invalid-city").prepend("Not a valid city");
            $("#new-city").val("");
            console.log("finished");
        }
    });

    return false;
}
