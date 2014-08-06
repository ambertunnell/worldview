$(function () {

    // var nyc = "new york city",
    //      london = "london",
    //      beijing = "beijing",
    //      sydney = "sydney",
    //      paris = "paris france";

    $(".clock img").click(function () {
        $('#twitter').empty();
        var location = $(this).closest(".clock").data('city');
        // switch (location){
        //   case 'new york city':
        //     search_term = nyc
        //     break;
        //   case 'london':
        //     search_term = london
        //     break;
        //   case 'beijing':
        //     search_term = beijing
        //     break;
        //   case 'sydney':
        //     search_term = sydney
        //     break;
        //   case 'paris':
        //     search_term = paris
        //     break;

        var URL = "/twitter?location=" + location;
        // var URL = "/twitter/search?q=" + location + "&src=typd&mode=news"

        $.ajax({
            url: URL,
            data: {},
            dataType: "json",
            success: function (response) {
                // console.log(response);
                for (var i = 0; i < 10; i++) {
                    var tweet = response[i].text;

                    for (var j = 0; j < response[i].entities.hashtags.length; j++) {
                    var hash = response[i].entities.hashtags[j].text
                    tweet = tweet.replace("#" + hash, "<a href=\"http://twitter.com/search?q=%23" + hash + "\" target=\"_blank\">" + "#" + hash + "</a>");
                    }

                    for (var j = 0; j < response[i].entities.user_mentions.length; j++) {
                    var mentions = response[i].entities.user_mentions[j].screen_name
                    tweet = tweet.replace("@" + mentions, "<a href=\"http://twitter.com/search?q=%40" + mentions + "\" target=\"_blank\">" + "@" + mentions + "</a>");
                    }

                    for (var j = 0; j < response[i].entities.urls.length; j++) {
                    var url = response[i].entities.urls[j].url
                    var eurl = response[i].entities.urls[j].expanded_url
                    tweet = tweet.replace(url, "<a href=\"" + eurl + "\" target=\"_blank\">" + eurl + "</a>");
                    }

                    if (response[i].entities.media !== undefined) {
                        for (var j = 0; j < response[i].entities.media.length; j++) {
                        var url = response[i].entities.media[j].url
                        // var eurl = response[i].media.urls[j].expanded_url
                        tweet = tweet.replace(url, "<a href=\"" + url + "\" target=\"_blank\">" + url + "</a>");
                        }
                    };

                    $('#twitter').append("<div><h3>" + tweet + "</h3></div>");
                
                }
            },
            error: function (response) {
                console.log("error");
                console.log(response);
            }



        });
    });
});


