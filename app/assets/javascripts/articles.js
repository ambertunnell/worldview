function article (location) {

    

        $('.news-header').show();
        $('#news').empty();


        var search;
        var country;

        switch (location) {
            case 'newyork':
                search = "new+york+city";
                country = "\"New%20York%20City\""
                break;
            case 'london':
                search = "london";
                country = "\"London (England)\""
                break;
            case 'hongkong':
                search = "hong+kong"; 
                country = "\"CHINA\"";
                break;
            case 'sydney':
                search = "sydney";
                country = "\"Australia\"";
                break;
            case 'paris':
                search = "paris";
                country = "\"france\"";
                break;
            case 'sanfran':
                search = "san+francisco";
                country = "\"San%20Francisco\"";
                break;
        };

        var API_KEY = "dd74b110c07677ce3e0c5c1f94642e26:10:31738630";
        var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q=" + search + "&sort=newest&fq=type_of_material:(News)%20AND%20glocations:("+country+")&api-key=" + API_KEY;
       
       

        $.ajax({
            url: URL,
            data: {},
            dataType: "jsonp",
            jsonpCallback: 'svc_search_v2_articlesearch',
            success: function (response) {
               
                if (response.response.docs.length == 0){
                    console.log ("No articles found with query " + search)
                }
                for (var i = 0; i < 10; i++) {

                    var result = response.response.docs[i];
                    var id = response.response.docs[i]._id;
                    var title = response.response.docs[i].headline.main;
                    var abstract = response.response.docs[i].snippet;
                    var url = response.response.docs[i].web_url;
                    var pubdate = response.response.docs[i].pub_date.split("T")[0];
                    var imagesArray = response.response.docs[i].multimedia;
                    $('#news').append("<li class='article' data-id=" + id + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + abstract + "</p><p>" + pubdate + "</p><button class='save-article'>Read later</button></li>");
                     }
                $('#news').hide();
                $('#news').slideDown(5000);
            },
            error: function (response) {
                console.log("News ajax query failed.");
            }
        });
   
}
$(function () {
    $('.news-header').hide();
    $("#news").on("click", ".save-article", function (event) {
        event.preventDefault();

        var articleTitle = $(this).closest('li').eq(0).find("h3").text();
        var articleAbstract = $(this).closest('li').eq(0).find("p").eq(0).text();
        var articlePubdate = $(this).closest('li').eq(0).find("p").eq(1).text();
        var articleUrl = $(this).closest('li').eq(0).find("a").attr("href");

        var $that = $(this);

        $.ajax({
            type: "POST",
            url: "/articles",
            data: {
                article: {
                    title: articleTitle,
                    abstract: articleAbstract,
                    url: articleUrl,
                    pubdate: articlePubdate
                }
            },
            success: function (response) {
                console.log("Saving article successful.");
                $that.text("Article saved in dashboard!");
            },
            error: function (response) {
                console.log("Saving article failed.");
            }
        });
    });

   
});