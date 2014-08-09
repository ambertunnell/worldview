$(function () {

    $('.photos-header').hide();
    $('#flickr').hide();

    $(".ul-clock").click(function () {


        // var nyc = "times%20square",
        //     london = "buckingham%20palace",
        //     hongkong = "hong%20kong%20skyline",
        //     sydney = "sydney%20opera%20house",
        //     paris = "paris%20france%20eiffel%20tower",
        //     sanfran = "san%20francisco%20ca";

         var nyc = "new%20york%20city",
            london = "london%20england",
            hongkong = "hong%20kong",
            sydney = "sydney%20australia",
            paris = "paris%20france",
            sanfran = "san%20francisco%20ca";    


        $('.photos-header').show();
        $('#flickr').show();
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

                var photosArray = response.photos.photo;

                for (var i = 0; i < 12; i++) {
                    var farmid = photosArray[i].farm;
                    var id = photosArray[i].id;
                    var serverid = photosArray[i].server;
                    var secret = photosArray[i].secret;
                    var title = photosArray[i].title;

                    var image = "https://farm" + farmid + ".staticflickr.com/" + serverid + "/" + id + "_" + secret + "_n.jpg";

                    $('#flickr').append("<li><div class='photo col-md-3 img-thumbnail'><a target='_blank' href='" + image +"'><img src=" + image + "></a><button class='save-photo'>Like</button></div></li>");

                }

            },
            error: function (response) {
                console.log("Flickr photos get request failed.");
            }
        });

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