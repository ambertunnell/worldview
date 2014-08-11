function article (passedCity1) {

        $('.news-header').show();
        $('#news1').empty();
        $('#news2').empty();

        var search;
        var country;
        var cityName = passedCity1.name.toLowerCase();
        var biggerthing = passedCity1.bigger_thing;
        switch (cityName) {
            case 'new york city':
                search = "new+york+city";
                country = "\"New%20York%20City\""
                break;
            case 'london':
                search = "london";
                country = "\"London (England)\""
                break;
            case 'hong kong international':
                search = "hong+kong"; 
                country = "\"CHINA\"";
                break;
            default:
                search = cityName;
                country = biggerthing;
            
        };

        var today = new Date();
        var past = today.setDate(today.getDate()-15);
        var pastDate = new Date(past);
        var dd = pastDate.getDate();
        var mm = pastDate.getMonth() + 1; //January is 0 so this will be a month behind
        var yyyy = pastDate.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 
        
        past_month = yyyy+mm+dd;
        
        var API_KEY = "dd74b110c07677ce3e0c5c1f94642e26:10:31738630";
        var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q=" + search + "&sort=newest&begin_date="+past_month+"&fq=type_of_material:(News)%20AND%20glocations:("+country+")&api-key=" + API_KEY;
       

        $.ajax({
            url: URL,
            data: {},
            dataType: "jsonp",
            jsonpCallback: 'svc_search_v2_articlesearch',
            success: function (response) {
                var numberOfArticles = response.response.docs.length;
                 console.log("Initially found this many articles " + numberOfArticles + " URL= " + URL);

               if (numberOfArticles < 5){ //FIRST <5 IF
                    
                    URL = "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q=" + search + "%20" + country + "&sort=newest&begin_date="+past_month+"&fq=type_of_material:(News)&api-key=" + API_KEY;
                    console.log("finding more articles by removing geoloc and searching city + bigthing in query. URL= " + URL);

                    $.ajax({
                        url: URL,
                        data: {},
                        dataType: "jsonp",
                        jsonpCallback: 'svc_search_v2_articlesearch',
                        success: function (response) {
                            numberOfArticles = response.response.docs.length;
                            console.log("On 2nd search found this many articles " + numberOfArticles);
                            if (numberOfArticles < 5){ //BEGIN 2ND <5 IF
                                
                                URL = "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q="+country+"&sort=newest&begin_date="+past_month+"&fq=type_of_material:(News)&api-key=" + API_KEY;
                                // URL = "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q="+country+"&sort=newest&begin_date="+past_month+"&fq=type_of_material:(News)%20AND%20glocations:("+country+")&api-key=" + API_KEY;   q=countyr and geoloc = country


                                console.log("finding more articles by searching only country as query URL= " + URL);
                                $.ajax({
                                    url: URL,
                                    data: {},
                                    dataType: "jsonp",
                                    jsonpCallback: 'svc_search_v2_articlesearch',
                                    success: function (response) {
                                        numberOfArticles = response.response.docs.length;
                                        console.log("On 3nd search found this many articles " + numberOfArticles);
                                        printArticles(response);
                                    },
                                     error: function (response) {
                                        console.log("News ajax query failed.");
                                    }
                                });
                            } else {//end 2nd <5 if
                                printArticles(response);
                            }
                        },
                        error: function (response) {
                         console.log("News ajax query failed.");
                        }
                    });
                } else { //end if articles < 5

                    printArticles(response);
               }

            },
            error: function (response) {
                console.log("News ajax query failed.");
            }
        });
   
}


function printArticles(response){
    numberOfArticles = response.response.docs.length;
    var loop1;
    if (numberOfArticles > 5) {loop1 = 5} else {loop1 = numberOfArticles}
    for (var i = 0; i < loop1; i++) {
        var result = response.response.docs[i];
        var id = response.response.docs[i]._id;
        var title = response.response.docs[i].headline.main;
        var abstract = response.response.docs[i].snippet;
        var url = response.response.docs[i].web_url;
        var pubdate = response.response.docs[i].pub_date.split("T")[0];
        var imagesArray = response.response.docs[i].multimedia;

        if (imagesArray.length > 0){
            var image = "http://www.nytimes.com/" + imagesArray[1].url;
             $('#news1').append("<li class='article' data-id=" + id + "><img src=" + image + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + pubdate + "</p><p>" + abstract + "</p><button class='save-article'>Read later</button></li>");
        } else {
            var image = "no image available"
             $('#news1').append("<li class='article' data-id=" + id + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + pubdate + "</p><p>" + abstract + "</p><button class='save-article'>Read later</button></li>");
        }

    }

    if (numberOfArticles > 5) {
        for (var i = 5; i < numberOfArticles; i++) {
            var result = response.response.docs[i];
            var id = response.response.docs[i]._id;
            var title = response.response.docs[i].headline.main;
            var abstract = response.response.docs[i].snippet;
            var url = response.response.docs[i].web_url;
            var pubdate = response.response.docs[i].pub_date.split("T")[0];
            var imagesArray = response.response.docs[i].multimedia;

            if (imagesArray.length > 0){
                var image = "http://www.nytimes.com/" + imagesArray[1].url;
                 $('#news2').append("<li class='article' data-id=" + id + "><img src=" + image + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + pubdate + "</p><p>" + abstract + "</p><button class='save-article'>Read later</button></li>");
            } else {
                var image = "no image available"
                 $('#news2').append("<li class='article' data-id=" + id + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + pubdate + "</p><p>" + abstract + "</p><button class='save-article'>Read later</button></li>");
            }

        } 
        $('#news').hide();
        $('#news').slideDown(5000);
    }

}


$(function () {
    $('.news-header').hide();
    
    $("#news").on("click", ".save-article", function (event) {
        event.preventDefault();

        var articleTitle = $(this).closest('li').eq(0).find("h3").text();
        var articlePubdate = $(this).closest('li').eq(0).find("p").eq(0).text();
        var articleAbstract = $(this).closest('li').eq(0).find("p").eq(1).text();
        // var newDate = $(this).closest('li').eq(0).find("p").eq(1).text().split("T")[0];
        var articleUrl = $(this).closest('li').eq(0).find("a").attr("href");
        var articleImage = $(this).closest('li').eq(0).find("img").attr("src");

        var $that = $(this);

        $.ajax({
            type: "POST",
            url: "/articles",
            data: {
                article: {
                    title: articleTitle,
                    abstract: articleAbstract,
                    url: articleUrl,
                    pubdate: articlePubdate,
                    image: articleImage
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