$(function () {

    $('.twitter-header').hide();

    $(".ul-clock").click(function () {

        $('.twitter-header').show();
        $('#twitter').empty();

        var location = $(this).closest(".clock").data('city');

        var URL = "/twitter?location=" + location;

        $.ajax({
            url: URL,
            data: {},
            dataType: "json",
            success: function (response) {
                // console.log(response);
                for (var i = 0; i < 10; i++) {
                    var tweet = response[i].text;

                    for (var j = 0; j < response[i].entities.hashtags.length; j++) {
                        var hash = response[i].entities.hashtags[j].text;
                        tweet = tweet.replace("#" + hash, "<a href=\"http://twitter.com/search?q=%23" + hash + "\" target=\"_blank\">" + "#" + hash + "</a>");
                    }

                    for (var j = 0; j < response[i].entities.user_mentions.length; j++) {
                        var mentions = response[i].entities.user_mentions[j].screen_name;
                        tweet = tweet.replace("@" + mentions, "<a href=\"http://twitter.com/search?q=%40" + mentions + "\" target=\"_blank\">" + "@" + mentions + "</a>");
                    }

                    for (var j = 0; j < response[i].entities.urls.length; j++) {
                        var url = response[i].entities.urls[j].url;
                        var eurl = response[i].entities.urls[j].expanded_url;
                        tweet = tweet.replace(url, "<a href=\"" + eurl + "\" target=\"_blank\">" + eurl + "</a>");
                    }

                    if (response[i].entities.media !== undefined) {
                        for (var j = 0; j < response[i].entities.media.length; j++) {
                            var url = response[i].entities.media[j].url;
                            tweet = tweet.replace(url, "<a href=\"" + url + "\" target=\"_blank\">" + url + "</a>");
                        }
                    }

                    $('#twitter').append("<li><h3>" + tweet + "</h3><button class='save-tweet'>Save for later.</button></li>");
                }
            },
            error: function (response) {
                console.log("error");
                console.log(response);
            }

        });
    });

    $("#twitter").on("click", ".save-tweet", function (event) {
        event.preventDefault();

        var individual_tweet = $(this).closest('li').find('h3').html();

        var $that = $(this);

        $.ajax({
            type: "POST",
            url: "/tweets",
            data: {
                tweet: {
                    data: individual_tweet
                }
            },
            success: function (response) {
                console.log("Saving tweet successful.");
                $that.text("Saved!");

            },
            error: function (response) {
                console.log("Saving tweet failed.");
            }
        });
    });


});

