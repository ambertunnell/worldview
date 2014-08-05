$(function () {

// $(".place").click(function () {

    var API_KEY = "b00e64b2e922c80462649603bea2f71f:19:31738630";

    var URL = "http://api.nytimes.com/svc/news/v3/content/all/world.jsonp?api-key=" + API_KEY;


    $.ajax({
        url: URL,
        dataType: "jsonp",
        success: function (response) {
          console.log(response);

          for (var i=0; i < 10; i++){  
            var result = response.results[i];
            var title = response.results[i].title;
            var abstract = response.results[i].abstract;
            var byline = response.results[i].byline;
            var url = response.results[i].url;


            $('#news-results').append("<div><h3>" + title + "</h3><p>" + abstract + "</p><p>" + "<a target='_blank' href='" + url + "'>Read more.</a></p></div>");
          }
        },
        error: function (response) {
            console.log("NYT ajax query failed.");
        } 
    });
 // });   
 });    