//**************** FIRST PHOTO FETCH ******************//
var photosArray = [];
function photos(location) {

    $('.more-photos').data('flickr-num', 0);

    var search = (location.name + "%20" + location.bigger_thing).replace(/ /g, "%20").toLowerCase();

    $('.photos-header').show();
    $('#flickr').show();
    $('#flickr').empty();

    $.ajax({
        type: "GET",
        url: "/photos/flickr",
        data: {
            search: search
        },
        dataType: "json",
        success: function (response) {
            console.log("Flickr photos GET request 1 successful.");

            photosArray = response.photos.photo;
            if (photosArray.length < 100) { //need to get 100 now for when more photos is clicked
                console.log("Photo loopLength set to " + photosArray.length);
            // Begin fallback ajax call
                search = (location.bigger_thing).replace(/ /g, "%20").toLowerCase();
                $.ajax({
                    type: "GET",
                    url: "/photos/flickr",
                    data: {
                        search: search
                    },
                    dataType: "json",
                    success: function (response) {
                        photosArray = photosArray.concat(response.photos.photo);
                        var loopLength = photosArray.length;
                        console.log("Flickr photos GET request 2 successful.");
                        if (loopLength > 12) {loopLength=12}
                        printPhotos (0,loopLength,0);
                    },
                    error: function (response) {
                        console.log("Flickr photos get request 2 failed.");
                    }
                });
            // End Fallback ajax

               
            } else {
                var loopLength = 12
                printPhotos (0,12,0);
            }

            
        },
        error: function (response) {
            console.log("Flickr photos get request 1 failed.");
        }
    });

}

function printPhotos(startL, endL, loopNum){ //note loopnum is written to the .more-photos datatag
    $('#flickr').empty();
    for (var i = startL; i < endL; i++) {
        var farmid = photosArray[i].farm;
        var id = photosArray[i].id;
        var serverid = photosArray[i].server;
        var secret = photosArray[i].secret;
        var title = photosArray[i].title;

        var image = "https://farm" + farmid + ".staticflickr.com/" + serverid + "/" + id + "_" + secret + "_n.jpg";

        var link = "http://flickr.com/photo.gne?id=" + id + "_" + secret + "_n.jpg"

        $('#flickr').append("<li><div class='photo col-md-3 img-thumbnail' style='background-image: url(" + image + "); background-size: cover'><a target='_blank' href='" + link + "'><img src=" + image + " style='height: 160px; width: 280px; border: none; opacity: .000000001'></a><button class='save-photo'>Save</button></div></li>");

        if (loggedIn == true) {
            console.log("Show photo like button.");

            for (var j = 0; j < userPhotos.length; j++) {
                if (image === userPhotos[j]) {
                    $("#flickr :last-child button").last().html("Saved in Dashboard");
                    $("#flickr :last-child button").last().prop("disabled",true);
                }
            }
        }

    }

    if (loggedIn == false) {
        $('.save-photo').hide();
    }

    $('.more-photos').data('flickr-num', loopNum);


}

$(function () {

    //**************** PHOTO SAVE ******************//   
    $('.photos-header').hide();
    $("#flickr").on("click", ".save-photo", function (event) {
        event.preventDefault();

        var photoUrl = $(this).closest("li").find('img').attr("src");
        var photoLink = $(this).closest("li").find('a').attr("href");

        var $that = $(this);

        $.ajax({
            type: "POST",
            url: "/photos",
            data: {
                photo: {
                    url: photoUrl,
                    link: photoLink
                }
            },
            success: function (response) {
                console.log("Saving photo successful.");
                $that.text("Saved to Dashboard");
                $that.prop("disabled",true);

            },
            error: function (response) {
                console.log("Saving photo failed.");
            }
        });
    });


    //**************** MORE PHOTO FETCH ******************//
    $(".more-photos").click(function () {
        var loopNum = $('.more-photos').data('flickr-num') + 1;
        var maxLoop = Math.floor(photosArray.length / 12);
        if(maxLoop > 7) {maxLoop = 7;}
        console.log("Photo max loop number is " + maxLoop);
        if(loopNum === maxLoop) {loopNum = 0;}
        console.log(loopNum);
        switch (loopNum) {
            case 0:
                var start = 0;
                var end = 12;
                break;
            case 1:
                var start = 13;
                var end = 25;
                break;
            case 2:
                var start = 26;
                var end = 38;
                break;
            case 3:
                var start = 39;
                var end = 51;
                break;
            case 4:
                var start = 52;
                var end = 64;
                break;
            case 5:
                var start = 65;
                var end = 77;
                break;
            case 6:
                var start = 78;
                var end = 90;
                break;
            case 7:
                var start = 91;
                var end = 100;
                loopNum = -1; //so datatag gets written as -1 and loop will start over
                break;
        }
            printPhotos(start,end, loopNum);
    });
});

 
