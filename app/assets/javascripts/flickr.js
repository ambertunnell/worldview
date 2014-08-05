$(function () {


  var nyc_coords = "new york",
      london_coords = "london",
      beijing_coords = "beijing",
      sydney_coords = "sydney",
      paris_coords = "paris france";

  $(".clock img").click(function() {
    $('#flickr').empty();
    var location = $(this).closest(".clock").data('city');
    switch (location){
      case 'nyc':
        coords = nyc_coords
        break;
      case 'london':
        coords = london_coords
        break;
      case 'beijing':
        coords = beijing_coords
        break;
      case 'sydney':
        coords = sydney_coords
        break;
      case 'paris':
        coords = paris_coords
        break;
    };
  
  var URL = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + coords;

    $.ajax({
        url: URL,
        data: {},
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        success: function (response) {
          console.log(response);
            for (var i=0; i < 20; i++){  
              var result = response.items[i];
              var title = result.title
              var image = result.media.m;
              var link = result.link
              $('#flickr').append("<div><h3>" + "<a href='" + link + "'>" + title + "</h3><p>" + "<img src=" + image + "></p></div>");
            }
            
        },
        error: function (response) {
            console.log("error");
            console.log(response);
        }

    });
 });

});

