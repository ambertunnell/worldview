$(function () {

    $(".clock img").click(function () {

        $('#news').empty();

        var location = $(this).closest(".clock").data('city');

        switch (location) {
            case 'nyc':
                var search = "new+york";
                break;
            case 'london':
                var search = "london";
                break;
            case 'beijing':
                var search = "beijing";
                break;
            case 'sydney':
                var search = "sydney";
                break;
            case 'paris':
                var search = "paris";
                break;
        };

        var API_KEY = "dd74b110c07677ce3e0c5c1f94642e26:10:31738630";
        var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q=" + search + "&sort=newest&api-key=" + API_KEY;

        $.ajax({
            url: URL,
            data: {},
            dataType: "jsonp",
            jsonpCallback: 'svc_search_v2_articlesearch',
            success: function (response) {
                console.log(response.response.docs);

                for (var i = 0; i < 10; i++) {
     
                    var result = response.response.docs[i];
                    var title = response.response.docs[i].headline.main;
                    var abstract = response.response.docs[i].snippet;
                    var byline = response.response.docs[i].byline.original;
                    var url = response.response.docs[i].web_url;
                    var pubdate = response.response.docs[i].pub_date;
                    var imagesArray = response.response.docs[i].multimedia;
                        // images urls = response.response.docs[i].multimedia[i].url 

                    $('#news').append("<div><h3>" + title + "</h3><p>" + abstract + "</p>" + "<p>" + pubdate + "</p><p>" + "<a target='_blank' href='" + url + "'>Read more.</a></p></div>");
                }
            },
            error: function (response) {
                console.log("NYT ajax query failed.");
            }
        });
    });
});   


