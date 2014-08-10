$(function () {
  
  // see if url has has and get that hash
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
                var pubdate = response[i].pubdate;
                var abstract = response[i].abstract;
                $('#dashboard .dashboard-articles').append("<li class='my-article'><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + abstract + "</p><p>" + pubdate + "</p><button class='remove-article'>Remove</button></li>");
            }
        },
        error: function (response) {
          console.log("Article get request failed.");
        }
      });

      //ARTICLES - REMOVE

      $(".modal-text").on("click",".remove-article", function(){
          console.log("Remove article button clicked");
          $(this).closest(".my-article").slideUp({
            // populateDashboard();
          });
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
                $('#dashboard .dashboard-photos').append("<li class='photo'><h3>" + "<a target='_blank' href='" + link + "'>" + title + "</h3><p>" + "<img src=" + url + "> </p></a><button class='remove-photo'>Remove.</li></button></p>");
            }
        },
        error: function (response) {
            console.log("Photo get request failed.");
        }
      });
      
      //FLICKR - REMOVE

      $(".modal-text").on("click",".remove-photo", function(){
        console.log("Remove photo button clicked");
        $(this).closest(".photo").slideUp({
          // populateDashboard();
        });
        var photoUrl = $(this).closest("li").find("p a").attr("href")
        // console.log("photo url- " + photoUrl);
        
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

            $('#dashboard .dashboard-tweets').empty();

            for (var i = 0; i < response.length; i++) {
                var data = response[i].data;

                $('#dashboard .dashboard-tweets').append("<li><h3>" + data + "</h3><button class='remove-tweet'>Remove</button></li>");
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
            },
            error: function(response) {
                console.log("Tweet DELETE request failed");
                console.log("tweet url = " + tweetData)
            }

        });

      });
  }//end of populateDashboard
});
