$(function () {

  $('.clock-row').on('click', '.ul-clock', function(){
    $.ajax({
        type: "GET",
        url: "/users/signed_in",
        success: function (response) {
          console.log("Sign_in AJAX request succeeded.");

          if (response == true){
            console.log("A user is logged in.")
            $('.save-article').show();
            $('.save-photo').show();
            $('.save-tweet').show();            
          } else {
            console.log("A user is not logged in.")
            $('.save-article').hide();
            $('.save-photo').hide();
            $('.save-tweet').hide();
          }
        },
        error: function (response){
          console.log("Error could not retrieve user information.");
        }
    }); 
  });    
 
});

