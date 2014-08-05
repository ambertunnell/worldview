$(function () {


    var URL = "/twitter?location=" + location;


    $.ajax({
        url: URL,
        data: {},
        dataType: "json",
        success: function (response) {
          console.log(response);
            for (var i=0; i < 10; i++){  
              var tweet = response[i].text
              $('#twitter').append("<div><h3>" + tweet + "</h3></div>");
            }    
        },
        error: function (response) {
            console.log("error");
            console.log(response);
        }

    });
 });


