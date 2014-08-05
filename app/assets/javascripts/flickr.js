$(function () {


    var URL = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=egypt";


    $.ajax({
        url: URL,
        data: {},
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        success: function (response) {
          console.log(response);

            
        },
        error: function (response) {
            console.log("error");
            console.log(response);
        }

    });
 });