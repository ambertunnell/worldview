function printTweet (col,tweetHTML,id) {
  $('#twitter' + col).append("<li data-id=\"" + id + "\"><div class='individual-tweet'><h3>" + tweetHTML + "</h3><button class='save-tweet'>Save</button></div></li>");
  if (loggedIn == true) {
      console.log("Show tweet like button.");

      for (var j = 0; j < userTweets.length; j++) {
          if (id === userTweets[j]) {
              $("#twitter"+col +" :last-child button").last().html("Saved to Dashboard");
              $("#twitter"+col +" :last-child button").last().prop("disabled",true);
          }
      }
  } 
}

function tweets(location) {

        var search_term = location.name.replace(/ /g,"");
   
        $('.twitter-header').show();
        $('#twitter1').empty();
        $('#twitter2').empty();
        $('#twitter3').empty();
        $('#twitter4').empty();
        
        var URL = "/twitter?location=" + userCity.id;

        $.ajax({
            url: URL,
            type: "GET",
            data: {},
            dataType: "json",
            success: function(response) {
                
                for (var i = 0; i < response.length; i++) {
                    var tweet = response[i].text;
                    var id = response[i].id;

                    // render hashtags as links
                    for (var j = 0; j < response[i].entities.hashtags.length; j++) {
                        var hash = response[i].entities.hashtags[j].text;
                        tweet = tweet.replace("#" + hash, "<a href=\"http://twitter.com/search?q=%23" + hash + "\" target=\"_blank\">" + "#" + hash + "</a>");
                    }

                    // render handles as links
                    for (var j = 0; j < response[i].entities.user_mentions.length; j++) {
                        var mentions = response[i].entities.user_mentions[j].screen_name;
                        tweet = tweet.replace("@" + mentions, "<a href=\"http://twitter.com/search?q=%40" + mentions + "\" target=\"_blank\">" + "@" + mentions + "</a>");
                    }

                    // render urls as clickable links
                    for (var j = 0; j < response[i].entities.urls.length; j++) {
                        var url = response[i].entities.urls[j].url;
                        tweet = tweet.replace(url, "<a href=\"" + url + "\" target=\"_blank\">" + url + "</a>");
                    }

                    // render media urls as clickable links
                    if (response[i].entities.media !== undefined) {
                        for (var j = 0; j < response[i].entities.media.length; j++) {
                            var url = response[i].entities.media[j].url;
                           tweet = tweet.replace(" " + url, "");
                           tweet = tweet + "<img src=" + response[i].entities.media[j].media_url + ">";
                            
                        }
                    }

                    //print tweet

                    printTweet((i % 4)+1,tweet,id);

                 }

                if (loggedIn == false) {
                    $('.save-tweet').hide();
                }

            },
            error: function (response) {
                console.log("error");
            }

        });
    
}

$(function () {
    $('.twitter-header').hide();
    $("#twitter1, #twitter2, #twitter3, #twitter4").on("click", ".save-tweet", function (event) {
        event.preventDefault();

        var individual_tweet = $(this).closest('li').find('h3').html();
        var id = $(this).closest('li').data("id");

        var $that = $(this);

        $.ajax({
            type: "POST",
            url: "/tweets",
            data: {
                tweet: {
                    data: individual_tweet,
                    uid: id
                }
            },
            success: function (response) {
                console.log("Saving tweet successful.");
                $that.text("Saved to Dashboard");

            },
            error: function (response) {
                console.log("Saving tweet failed.");
            }
        });
    });
});



