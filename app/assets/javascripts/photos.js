$(function () {

    $('.photos-header').hide();
    $('#flickr').hide();

    $(".ul-clock").click(function () {


        var nyc = "times%20square",
            london = "buckingham%20palace",
            hongkong = "hong%20kong%20skyline",
            sydney = "sydney%20opera%20house",
            paris = "paris%20france%20eiffel%20tower",
            sanfran = "san%20francisco%20ca";


        $('.photos-header').show();
        $('#flickr').empty();

        var location = $(this).closest(".clock").data('city');
        switch (location) {
            case 'nyc':
                var search = nyc;
                break;
            case 'london':
                var search = london;
                break;
            case 'hongkong':
                var search = hongkong;
                break;
            case 'sydney':
                var search = sydney;
                break;
            case 'paris':
                var search = paris;
                break;
            case 'sanfran':
                var search = sanfran;
                break;
        }

        $.ajax({
            type: "GET",
            url: "/photos/flickr",
            data: {search: search},
            dataType: "json",
            success: function (response) {
                console.log("Flickr photos GET request successful.");
                console.log(response);

                var photosArray = response.photos.photo;

                for (var i = 0; i < 10; i++) {
                    var farmid = photosArray[i].farm;
                    var id = photosArray[i].id;
                    var serverid = photosArray[i].server;
                    var secret = photosArray[i].secret;
                    var title = photosArray[i].title;

                    var image = "https://farm" + farmid + ".staticflickr.com/" + serverid + "/" + id + "_" + secret + ".jpg";

                    console.log(image);

                    $('#flickr').append("<li><div class='clearfix' style='height: 50px'><h5>" + title + "</h5><img src=" + image + "><button class='save-photo'>Like</button></div></li>");

                }

            },
            error: function (response) {
                console.log("Flickr photos get request failed.");
            }
        });



        // var URL = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + search;
        // $.ajax({
        //     url: URL,
        //     data: {},
        //     dataType: "jsonp",
        //     jsonp: 'jsoncallback',
        //     success: function (response) {
        //         // console.log(response);
        //         for (var i = 0; i < 20; i++) {
        //             var result = response.items[i];
        //             var title = result.title;
        //             var image = result.media.m.replace("_m.","_c.");
        //             var link = result.link;
        //             $('#flickr').append("<li class='photo col-md-2' data-location='" + location + "'><div><h5>"+title+"</h5><a href='" + link + "' target='_blank'>" + "<img src=" + image + "></a></div><div></div><button class='save-photo'>Like</button></li>");
        //         }
        //     },
        //     error: function (response) {
        //         console.log("error");
        //         // console.log(response);
        //     }

        // });

    });


    $("#flickr").on("click", ".save-photo", function (event) {
        event.preventDefault();

        var photoTitle = $(this).closest("li").find("h5").text();
        var photoUrl = $(this).closest("li").find("img").attr("src");
        console.log(photoUrl);
        var $that = $(this);

        $.ajax({
            type: "POST",
            url: "/photos",
            data: {
                photo: {
                    title: photoTitle,
                    url: photoUrl
                }
            },
            success: function (response) {
                console.log("Saving photo successful.");
                $that.text("Saved!");

            },
            error: function (response) {
                console.log("Saving photo failed.");
            }
        });
    });

});