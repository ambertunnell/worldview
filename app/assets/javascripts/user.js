var loggedIn;  

$(function () {

$.ajax({
      type: "GET",
      url: "/users/signed_in",
      success: function (response) {
        console.log("Sign_in AJAX request succeeded.");
        if (response == true){
          console.log("A user is logged in.")
          loggedIn = true;
        } else {
          loggedIn = false;
          console.log("A  user is not logged in.")
        }
      },
      error: function (response){
        console.log("Error could not retrieve user information.");
        loggedIn = false;
      }
  }); 

}); 