function photos(location) {

  

 

        $('.more-photos').data('flickr-num', 0);

        var nyc = "new%20york%20city",
            london = "london%20england",
            hongkong = "hong%20kong",
            sydney = "sydney%20australia",
            paris = "paris%20france",
            sanfran = "san%20francisco%20ca";    

        $('.photos-header').show();
        $('#flickr').show();
        $('#flickr').empty();

  
        switch (location) {
            case 'newyork':
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

                    var link = "http://flickr.com/photo.gne?id=" + id + "_" + secret + "_n.jpg"

                    $('#flickr').append("<li><div class='photo col-md-3 img-thumbnail'><a target='_blank' href='" + link +"'><img src=" + image + "></a><button class='save-photo'>Like</button></div></li>");
                }

            },
            error: function (response) {
                console.log("Flickr photos get request failed.");
            }
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


    $(".more-photos").click(function () {

        var nyc = "new%20york%20city",
            london = "london%20england",
            hongkong = "hong%20kong",
            sydney = "sydney%20australia",
            paris = "paris%20france",
            sanfran = "san%20francisco%20ca";    

        $('#flickr').empty();

        var locationstatus = $('#current-location').find('a')[0].text;

        switch (locationstatus) {
            case " CURRENT LOCATION: NYC":
                var search = nyc;
                break;
            case " CURRENT LOCATION: LONDON":
                var search = london;
                break;
            case " CURRENT LOCATION: HONG KONG":
                var search = hongkong;
                break;
            case " CURRENT LOCATION: SYDNEY":
                var search = sydney;
                break;
            case " CURRENT LOCATION: PARIS":
                var search = paris;
                break;
            case " CURRENT LOCATION: SAN FRANCISCO":
                var search = sanfran;
                break;
        }

        $.ajax({
            type: "GET",
            url: "/photos/flickr",
            data: {search: search},
            dataType: "json",
            success: function (response) {
                console.log("Flickr photos GET more request successful.");

                var photosArray = response.photos.photo;
                var loopNum = $('.more-photos').data('flickr-num');

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
                var end = 50;
                break;
            case 3:
                var start = 51;
                var end = 75;
                break;  
            case 4:
                var start = 76;
                var end = 100;
                break;
            case 5:
                $('.more-photos').data('flickr-num', 0);
            }                       

                for (var i = start; i < end; i++) {
                    var farmid = photosArray[i].farm;
                    var id = photosArray[i].id;
                    var serverid = photosArray[i].server;
                    var secret = photosArray[i].secret;
                    var title = photosArray[i].title;

                    var image = "https://farm" + farmid + ".staticflickr.com/" + serverid + "/" + id + "_" + secret + "_n.jpg";

                    var link = "http://flickr.com/photo.gne?id=" + id + "_" + secret + "_n.jpg"

                    $('#flickr').append("<li><div class='photo col-md-3 img-thumbnail'><a target='_blank' href='" + link +"'><img src=" + image + "></a><button class='save-photo'>Like</button></div></li>");
                   
                    var newNum = loopNum + 1;
                    $('.more-photos').data('flickr-num', newNum);
                }

            },
            error: function (response) {
                console.log("Flickr photos get request failed.");
            }
        });

    });

}