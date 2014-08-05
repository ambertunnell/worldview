$(function () {

    var API_KEY = "b00e64b2e922c80462649603bea2f71f:19:31738630";

    var URL = "http://api.nytimes.com/svc/news/v3/content/all/world.jsonp?api-key=" + API_KEY;


    $.ajax({
        url: URL,
        dataType: "jsonp",
        success: function (response) {
          console.log(response);
            $('#news-results').append("<li>" + response + "</li>");
        },
        error: function (response) {
            console.log("error");
        }

    });
 });    