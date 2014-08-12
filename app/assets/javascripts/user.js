var loggedIn;  
var userArticles;
var userPhotos;
var userTweets;

$(function () {

$.ajax({
      type: "GET",
      url: "/users/signed_in",
      success: function (response) {
        console.log("Sign_in AJAX request succeeded.");
        if (response.signed_in == true){
          console.log("A user is logged in.");
          loggedIn = true;
          userArticles = response.articles;
          userPhotos = response.photos;
          userTweets = response.tweets;
        } else {
          loggedIn = false;
          console.log("A  user is not logged in.")
        }
      },
      error: function (response){
        console.log("Error could not retrieve user information.");
        loggedIn = false;
        console.log(response);
      }
  }); 

}); 