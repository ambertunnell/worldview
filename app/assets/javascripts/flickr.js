$(function () {


    var URL = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=iraq";


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