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
      //ARTICLES
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
                $('#dashboard .dashboard-articles').append("<li class='my-article'><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + abstract + "</p><p>" + pubdate + "</p><button class='remove-article'>Remove.</button></li>");
            }
        },
        error: function (response) {
          console.log("Article get request failed.");
        }
      });
      
      //FLICKR
      $.ajax({
        type: "GET",
        url: "/photos",
        success: function (response) {
            console.log("Photo GET request successful.");

            $('#dashboard .dashboard-photos').empty();

            for (var i = 0; i < response.length; i++) {
                var url = response[i].url;
                var title = response[i].title;
                console.log(url)
                $('#dashboard .dashboard-photos').append("<li class='photo'><h3>" + "<a href='" + url + "'>" + title + "</h3><p>" + "<img src=" + url + "> </p></a><button class='remove-photo'>Remove.</li></button></p>");
            }
        },
        error: function (response) {
            console.log("Photo get request failed.");
        }
      });
      
      //TWITTER
      $.ajax({
        type: "GET",
        url: "/tweets",
        success: function (response) {
            console.log("Tweet GET request successful.");

            $('#dashboard .dashboard-tweets').empty();

            for (var i = 0; i < response.length; i++) {
                var data = response[i].data;

                $('#dashboard .dashboard-tweets').append("<li><h3>" + data + "</h3><button class='remove-tweet'>Remove.</button></li>");
            }
        },
        error: function (response) {
            console.log("Tweet get request failed.");
        }
      });
  }//end of populateDashboard
});
