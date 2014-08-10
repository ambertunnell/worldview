// $(function (){

  function submit_new_city() {
    $("#invalid_city").text(" ");
    $("#invalid_city").append("<span class = 'space'>&nbsp;</span>");
    console.log("submitted");
      var user_input = $("#new-city").val();
    // $("#new-city").submit(function(e) {
      // e.preventDefault();
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
          if (response.RESULTS.length === 0){
            $("#invalid_city").text("Not a valid city");
            console.log("Successful response and marked as undefined")
          } else {
          var first_result = response.RESULTS[0].name;
          $("#invalid_city").text(first_result + " added");
          console.log(response);
          console.log(response.RESULTS);
          var cityname = first_result.match(/(\D+)(,\s+)(\D+)/)[1]
          var bigger_thing = first_result.match(/(\D+)(,\s+)(\D+)/)[3]
          var lat = response.RESULTS[0].lat;
          var lon = response.RESULTS[0].lon;
          var country = response.RESULTS[0].c;
          console.log("new city form success: " + first_result +". Cityname = " + cityname + " and bigger thing= " + bigger_thing);
          
          $("#new-city").val("");
          console.log("finished");
          }

          $.ajax({
            type: "POST",
            url: "/cities",
            data: {
                city: {
                    name: cityname,
                    bigger_thing: bigger_thing,
                    lat: lat,
                    lon: lon,
                    country: country
                }
            },
            success: function (response) {
                console.log("Saving city successful.");
                
            },
            error: function (response) {
                console.log("Saving city failed.");
            }
        });
        },
        error: function(response) {
          // var first_result = response['results'][0]['name']
          console.log("new city form failure: " + response);
          $("#invalid-city").prepend("Not a valid city");
          $("#new-city").val("");
          console.log("finished");
        }
      });

      return false;

    // });

  }

// });