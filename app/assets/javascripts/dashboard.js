$(function () {
  
  // see if url has hash and get that hash
  var x = location.hash;

  //populate dashboard if URL is #dashboard
  if (x == "#dashboard"){
    populateDashboard();
  }

  //listen for dashboard X click
  $("#dashboard-xlink").click(function () {
    $('#dashboard').css({ "opacity": "0", "z-index": "0"});
  });

  $("#dashboard-link").click(function () {
      populateDashboard();
  });
    
  function populateDashboard(){
      $('#dashboard').css({ "opacity": "1", "z-index": "99999"});
      
      //ARTICLES - DISPLAY
      
      $.ajax({
        type: "GET",
        url: "/articles",
        success: function (response) {
            console.log("Article GET request successful.");
            $('#dashboard .dashboard-articles').empty();
            for (var i = 0; i < response.length; i++) {
                var url = response[i].url;
                var title = response[i].title;
                var pubdate = response[i].pubdate.split("T")[0];
                var abstract = response[i].abstract;
                var image = response[i].image;

                if (image != null) {
                  $('#dashboard .dashboard-articles').append("<li class='my-article'><img src=" + image + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p class='dashboard-pubdate'>" + pubdate + "</p><p>" + abstract + "</p><button class='remove-article'>Remove</button></li>");
                } else {
                $('#dashboard .dashboard-articles').append("<li class='my-article'><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p class='dashboard-pubdate'>" + pubdate + "</p><p>" + abstract + "</p><button class='remove-article'>Remove</button></li>");
                }

            }
        },
        error: function (response) {
          console.log("Article get request failed.");
        }
      });

      //ARTICLES - REMOVE

      $(".modal-text").on("click",".remove-article", function(){
          console.log("Remove article button clicked");
          $(this).closest(".my-article").slideUp({});
          var articleUrl = $(this).closest('li').eq(0).find("a").attr("href");
          
          $(this).html("Removed");
          $.ajax({
              type: "DELETE",
              url: "/articles",
              data: {
                  delete_request: {
                      url: articleUrl
                  }
              },
              success: function(response) {
                  console.log("Article DELETE request successful");
                  console.log("article url = " + articleUrl);
                  userArticles = response;
                  article(userCity);    
              },
              error: function(response) {
                  console.log("Article DELETE request failed");
                  console.log("article url = " + articleUrl)
              }

          });

      });
      
      //FLICKR - DISPLAY

      $.ajax({
        type: "GET",
        url: "/photos",
        success: function (response) {
            console.log("Photo GET request successful.");

            $('#dashboard .dashboard-photos').empty();

            for (var i = 0; i < response.length; i++) {
                var url = response[i].url;
                var title = response[i].title;
                var link = response[i].link;
                console.log(url);
                console.log(link);
                $('#dashboard .dashboard-photos').append("<li><div class='photo dash-photo' style='background-image: url(" + url + "); background-size: cover'><a target='_blank' href='" + link + "'><img src=" + url + "></a><button class='remove-photo'>Remove</button></div></li>");
            }
        },
        error: function (response) {
            console.log("Photo get request failed.");
        }
      });
      
      //FLICKR - REMOVE

      $(".modal-text").on("click",".remove-photo", function(){
        console.log("Remove photo button clicked");
        $(this).closest("li").fadeOut({
          // populateDashboard();
        }, 1500);
        var photoUrl = $(this).closest("li").find("img").attr("src")
        
        $(this).html("Removed");
        $.ajax({
            type: "DELETE",
            url: "/photos",
            data: {
                delete_request: {
                    url: photoUrl
                }
            },
            success: function(response) {
                console.log("Photo DELETE request successful");
                console.log("photo url = " + photoUrl);
                userPhotos = response;
                photos(userCity);
            },
            error: function(response) {
                console.log("Photo DELETE request failed");
                console.log("photo url = " + photoUrl)
            }

        });

      });

      //TWITTER - DISPLAY

      $.ajax({
        type: "GET",
        url: "/tweets",
        success: function (response) {
            console.log("Tweet GET request successful.");

            $('#dashboard .dashboard-tweets1').empty();
            $('#dashboard .dashboard-tweets2').empty();
            $('#dashboard .dashboard-tweets3').empty();

            for (var i = 0; i < response.length; i++) {
                var data = response[i].data;

                if (i % 3 === 0) {
                  $('#dashboard .dashboard-tweets1').append("<li><div class='individual-tweet-dash'><h3>" + data + "</h3><button class='remove-tweet'>Remove</button></div></li>");
                  console.log("Adding tweet " + i);
                }
                if (i % 3 === 1) {
                  $('#dashboard .dashboard-tweets2').append("<li><div class='individual-tweet-dash'><h3>" + data + "</h3><button class='remove-tweet'>Remove</button></div></li>");
                  console.log("Adding tweet " + i);
                }
                if (i % 3 === 2) {
                  $('#dashboard .dashboard-tweets3').append("<li><div class='individual-tweet-dash'><h3>" + data + "</h3><button class='remove-tweet'>Remove</button></div></li>");
                  console.log("Adding tweet " + i);
                }
            }
        },
        error: function (response) {
            console.log("Tweet GET request failed.");
        }
      });

      //TWITTER - REMOVE

      $(".modal-text").on("click",".remove-tweet", function(){
        console.log("Remove tweet button clicked");
        $(this).closest("li").slideUp({
        });
        var tweetData = $(this).closest('li').find('h3').html();
        console.log("tweet data url- " + tweetData);
        
        $(this).html("Removed");
        $.ajax({
            type: "DELETE",
            url: "/tweets",
            data: {
                delete_request: {
                    data: tweetData
                }
            },
            success: function(response) {
                console.log("Tweet DELETE request successful");
                console.log("tweet url = " + tweetData);
                userTweets = response;
                tweets(userCity);      
            },
            error: function(response) {
                console.log("Tweet DELETE request failed");
                console.log("tweet url = " + tweetData)
            }

        });

      });
  }//end of populateDashboard
});
