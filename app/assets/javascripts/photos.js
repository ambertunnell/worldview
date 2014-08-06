$(function () {

  $(".clock img").click(function() {
    var nyc = "new york city",
      london = "london",
      beijing = "beijing",
      sydney = "sydney",
      paris = "paris france";

    $('#flickr').empty();

    var location = $(this).closest(".clock").data('city');
    switch (location){
      case 'nyc':
        search = nyc;
        break;
      case 'london':
        search = london;
        break;
      case 'beijing':
        search = beijing;
        break;
      case 'sydney':
        search = sydney;
        break;
      case 'paris':
        search = paris;
        break;
    };
  
  var URL = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + search + "&sort=interestingness-desc";

    $.ajax({
        url: URL,
        data: {},
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        success: function (response) {
          // console.log(response);
            for (var i=0; i < 10; i++){  
              var result = response.items[i];
              var title = result.title
              var image = result.media.m;
              var link = result.link
              $('#flickr').append("<div class='photo'><h3>" + "<a href='" + link + "'>" + title + "</h3><p>" + "<img src=" + image + "></p></div>");
            }
            
        },
        error: function (response) {
            console.log("error");
            // console.log(response);
        }

    });

 });


  $( "#flickr" ).on( "click", ".photo", function( event ) {
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

