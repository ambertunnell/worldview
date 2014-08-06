$(function () {

    // var nyc = "new york city",
    //      london = "london",
    //      beijing = "beijing",
    //      sydney = "sydney",
    //      paris = "paris france";

    $(".clock img").click(function () {
        $('#twitter').empty();
        var location = $(this).closest(".clock").data('city');
        // switch (location){
        //   case 'new york city':
        //     search_term = nyc
        //     break;
        //   case 'london':
        //     search_term = london
        //     break;
        //   case 'beijing':
        //     search_term = beijing
        //     break;
        //   case 'sydney':
        //     search_term = sydney
        //     break;
        //   case 'paris':
        //     search_term = paris
        //     break;

        var URL = "/twitter?location=" + location;

        $.ajax({
            url: URL,
            data: {},
            dataType: "json",
            success: function (response) {
                // console.log(response);
                for (var i = 0; i < 10; i++) {
                    var tweet = response[i].text;
                    $('#twitter').append("<div class='tweet'><h3>" + tweet + "</h3></div>");
                }
            },
            error: function (response) {
                console.log("error");
                console.log(response);
            }



        });
    });

  $( "#twitter" ).on( "click", ".tweet", function( event ) {
      event.preventDefault();

     // $.ajax({
    //   type: 'POST',
    //   url: '/photos',
    //   data: {
    //       name: "test testing"
    //   },
    //   success: function(response) {
    //       console.log("")
    //   },
    //   error: function(response) {
    //       console.log("Didn't work");
    //   }
    //   });
  });

});


