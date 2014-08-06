$(function () {

    $(".clock img").click(function () {

        $('#news').empty();

        var location = $(this).closest(".clock").data('city');

        switch (location) {
            case 'nyc':
                var search = "new+york+city";
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
                // console.log(response.response.docs);

                for (var i = 0; i < 10; i++) {
     
                    var result = response.response.docs[i];
                    var id = response.response.docs[i]._id;
                    var title = response.response.docs[i].headline.main;
                    var abstract = response.response.docs[i].snippet;
                    var byline = response.response.docs[i].byline.original;
                    var url = response.response.docs[i].web_url;
                    var pubdate = response.response.docs[i].pub_date;
                    var imagesArray = response.response.docs[i].multimedia;
        
                    // for (var i=0; i<imagesArray.length;i++){
                    //     var image = imagesArray[i].url; 
                    //     // $('#news').append("<div>" + image + "</div>")
                    // }
                    $('#news').append("<p class='article' data-id=" + id + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + abstract + "</p><p>" + pubdate + "</p><button class='save-article'>Save for later.</button></p>");
                    // $('#news')
                    // $('#news').append("<p class='article' data-id=" + id + "><h3>" + title + "</h3><p>" + abstract + "</p>" + "<p>" + pubdate + "</p><p>" + "<a target='_blank' href='" + url + "'>Read more.</a></p><button class='save-article'>Save for later.</button></p>");
                };
                $('#news').hide();
                $('#news').slideDown(5000);
            },
            error: function (response) {
                console.log("NYT ajax query failed.");
            }
        });
    });

    $( "#news" ).on( "click", ".save-article", function( event ) {
      event.preventDefault();
      
      var articleTitle = $(this).closest('.article').eq(0).find("h3").text();
      var articleAbstract = $(this).closest('.article').eq(0).find("p").eq(0).text(); 
      var articlePubdate = $(this).closest('.article').eq(0).find("p").eq(1).text();
      // var articleByline = 
      var articleUrl = $(this).closest('.article').eq(0).find("p").eq(2).find("a").attr("href");
  
      var $that = $(this);

        $.ajax({
            type: "POST",
            url: "/articles",
            data: {article: {title: articleTitle, abstract: articleAbstract, url: articleUrl, pubdate: articlePubdate}},
            success: function(response){
                console.log("Saving article successful.");
                $that.text("Saved!");
            },
            error: function(response){
                console.log("Saving article failed.");
            }
        });
    

    });

});   


