$(function () {

    $('.news-header').hide();

    $(".ul-clock").click(function () {

        $('.news-header').show();
        $('#news').empty();

        var location = $(this).closest(".clock").data('city');

        var search;

        switch (location) {
            case 'nyc':
                search = "new+york+city";
                break;
            case 'london':
                search = "london";
                break;
            case 'hongkong':
                var search = "hong+kong"; 
                break;
            case 'sydney':
                search = "sydney";
                break;
            case 'paris':
                search = "paris";
                break;
            case 'sanfran':
                var search = "san+francisco";
                break;
        };

        var API_KEY = "dd74b110c07677ce3e0c5c1f94642e26:10:31738630";
        var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q=" + search + "&sort=newest&fq=type_of_material:(News) AND glocations:(search)&api-key=" + API_KEY;

        $.ajax({
            url: URL,
            data: {},
            dataType: "jsonp",
            jsonpCallback: 'svc_search_v2_articlesearch',
            success: function (response) {
                // console.log(response.response.docs);

                for (var i = 0; i < 10; i++) {

                    var result = response.response.docs[i];
                    var type = response.response.docs[i].type_of_material;
                    var id = response.response.docs[i]._id;
                    var title = response.response.docs[i].headline.main;
                    var abstract = response.response.docs[i].snippet;
                    if (response.response.docs[i].byline !== null && response.response.docs[i].byline.length !== 0)
                    {
                        var byline = response.response.docs[i].byline.original;
                    } else {
                        var byline = "no-by-line-given";
                    }
                    
                    //make sure author name didn't trigger our keyword search
                    var queryInAuth = new RegExp(search.replace("+","|")).test(byline.toLowerCase());
                    if (queryInAuth) {console.log(title + "excluded bc " + byline + " is in query " + search);}

                    var url = response.response.docs[i].web_url;
                    var pubdate = response.response.docs[i].pub_date.split("T")[0];
                    var imagesArray = response.response.docs[i].multimedia;
                    console.log(type + " " + byline);
                    if (type == "News" && !queryInAuth){
                        console.log("executed");
                        $('#news').append("<li class='article' data-id=" + id + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + abstract + "</p><p>" + pubdate + "</p><button class='save-article'>Save for later</button></li>");
                    }
                }
                $('#news').hide();
                $('#news').slideDown(5000);
            },
            error: function (response) {
                console.log("NYT ajax query failed.");
            }
        });
    });


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
                $that.text("Saved!");
            },
            error: function (response) {
                console.log("Saving article failed.");
            }
        });
    });

    // Populates dashboard with saved articles when profile link clicked 
   
    });
