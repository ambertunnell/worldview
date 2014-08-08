$(function () {

    $('.photos-header').hide();

    // $(".clock img").click(function () {
    $(".ul-clock").click(function () {
        var nyc = "new york city",
            london = "london",
            hongkong = "hong kong", 
            sydney = "sydney",
            paris = "paris france";
            sanfran = "san francisco ca";

        $('.photos-header').show();
        $('#flickr').empty();

        var search;

        var location = $(this).closest(".clock").data('city');
        switch (location) {
            case 'nyc':
                search = nyc;
                break;
            case 'london':
                search = london;
                break;
            case 'hongkong':
                search = hongkong;
                break;
            case 'sydney':
                search = sydney;
                break;
            case 'paris':
                search = paris;
                break;
            case 'sanfran':
                search = sanfran;
                break;
        }

        var URL = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + search + "&sort=interestingness-desc";

        $.ajax({
            url: URL,
            data: {},
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            success: function (response) {
                // console.log(response);
                for (var i = 0; i < 10; i++) {
                    var result = response.items[i];
                    var title = result.title;
                    var image = result.media.m.replace("_m.","_c.");
                    var link = result.link;
                    $('#flickr').append("<li class='photo'><h3>" + "<a href='" + link + "' target='_blank'>" + title + "</h3><p>" + "<img src=" + image + "></p></a><button class='save-photo'>Save for later</li></button></p>");

                }

            },
            error: function (response) {
                console.log("error");
                // console.log(response);
            }

        });

    });


    $("#flickr").on("click", ".save-photo", function (event) {
        event.preventDefault();

        var photoTitle = $(this).closest("li").find("h3").text();
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