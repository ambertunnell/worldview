var pickedArticles = []; //used by article pooler
var cityName;
var biggerthing;
var searchTries = 0;

function article (passedCity1) {

$('.news-header').show();
$('#news1').empty();
$('#news2').empty();
 
cityName = (passedCity1.name.toLowerCase()).replace(/ /g,"%20");
biggerthing = (passedCity1.bigger_thing.toLowerCase()).replace(/[^\w\s]/gi, '').replace(/ /g,"%20"); 

articleLoop();
   
}

//loop through the terms array for queries to try until there are 10 articles. relies on global vars to track # of tries
function articleLoop(){
    var terms = [[cityName,cityName],[cityName,biggerthing], [cityName + " " + biggerthing,"skip"], [biggerthing,"skip", true]];
    if (cityName.split("%20").slice().length > 2) {// cities with 3 words get cut to 2 words in cascading fall back searches
        var cityShort = cityName.split("%20").slice()[0] + "%20" + cityName.split("%20").slice()[1];
        terms.splice(1, 0, [cityShort,cityShort]);
        terms.splice(2, 0, [cityShort,biggerthing])
        terms.splice(4, 0, [cityShort + " " + biggerthing,"skip"]);
        console.log ("Spliced IN!!!!!!!!!");
        
    }
   
    var query = terms[searchTries][0];
    var geoloc = terms[searchTries][1];
    var fire = terms[searchTries][2];
    
    console.log ("  ...Have " + pickedArticles.length + " articles. Now Searching for QUERY " + query + " GEOLOC " + geoloc);
    articleRequest(query, geoloc, fire);
    searchTries ++;
}

//perform ajax query to news api.
function articleRequest(query, geoloc, fire){ //pass skip for 2nd arg to skip geoloc
    var API_KEY = "dd74b110c07677ce3e0c5c1f94642e26:10:31738630";
    var today = new Date();
    var past = today.setDate(today.getDate()-15);
    var pastDate = new Date(past);
    var dd = pastDate.getDate();
    var mm = pastDate.getMonth() + 1; //January is 0 so this will be a month behind
    var yyyy = pastDate.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    } 

    if(mm<10) {
        mm='0'+mm;
    } 
    
    past_month = yyyy+mm+dd;

    if (geoloc != undefined && geoloc != "skip"){         
        var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q=" + query + "&sort=newest&begin_date="+past_month+"&fq=type_of_material:(News)%20AND%20glocations:(%22"+geoloc+"%22)&api-key=" + API_KEY;
    }else {
        var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&q="+query+"&sort=newest&begin_date="+past_month+"&fq=type_of_material:(News)&api-key=" + API_KEY;
    }

    $.ajax({
        url: URL,
        data: {},
        dataType: "jsonp",
        jsonpCallback: 'svc_search_v2_articlesearch',
        success: function (response) {
            // var numberOfArticles = response.response.docs.length;
            
            articlePooler(response, fire);
        },
         error: function (response) {
            console.log("News ajax query failed.");
        }
    });
}

//collect articles until there are at least 10 or fire = true. Passed most geo specific articles first prints in that order.
function articlePooler(response, fire){ 
    var numberOfArticles = response.response.docs.length;
    var flagDup;
    console.log("Pooler passed " + numberOfArticles + " articles");
    for (var i = 0; i < numberOfArticles; i++) {
        flagDup = false;
        for (b = 0; b < pickedArticles.length; b++) { // loop through existing article for dup titles (happens when times updates an article)
            if (response.response.docs[i].headline.main == pickedArticles[b].headline.main) {flagDup = true; console.log ("dup detected. " + response.response.docs[i].headline.main); }
        }
        //flag predictable and undesirable articles from being included
        if (response.response.docs[i].headline.main == "Fight Schedule") {flagDup = true}
        if (!flagDup){pickedArticles[pickedArticles.length] = response.response.docs[i]}
    }
    console.log("Pooler has  " + pickedArticles.length  + " articles and FIRE = " + fire);
    if (pickedArticles.length >= 10 || fire == true){
        printArticles();
        searchTries = 0;

    }else{
        articleLoop();
    }
    
    return pickedArticles.length;

}





function printArticles(){
    numberOfArticles = pickedArticles.length;
    var response = pickedArticles;
    
 
    
    for (var i = 0; i < response.length; i=i+2) { //put every other article in first column
        var result = response[i];
        var id = response[i]._id;
        var title = response[i].headline.main;
        var abstract = response[i].snippet;
        var url = response[i].web_url;
        var pubdate = response[i].pub_date.split("T")[0];
        var imagesArray = response[i].multimedia;

        if (imagesArray.length > 0){
            var image = "http://www.nytimes.com/" + imagesArray[1].url;
             $('#news1').append("<li class='article' data-id=" + id + "><img src=" + image + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + pubdate + "</p><p>" + abstract + "</p><button class='save-article'>Save</button></li>");
        } else {
            var image = "no image available"
             $('#news1').append("<li class='article' data-id=" + id + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + pubdate + "</p><p>" + abstract + "</p><button class='save-article'>Save</button></li>");
        }

        if (loggedIn == true) {
            console.log("Show article saved button.");

            for (var j = 0; j < userArticles.length; j++) {
                if (url === userArticles[j]) {
                    $("#news1 :last-child button").last().html("Saved to Dashboard");
                    $("#news1 :last-child button").last().prop("disabled",true);
                }
            }
        }

        if (loggedIn == false) {
            $('.save-article').hide();
        }       

    }

 
        for (var i = 1; i < response.length; i=i+2) {//put every other article in 2nd column
            var result = response[i];
            var id = response[i]._id;
            var title = response[i].headline.main;
            var abstract = response[i].snippet;
            var url = response[i].web_url;
            var pubdate = response[i].pub_date.split("T")[0];
            var imagesArray = response[i].multimedia;

            if (imagesArray.length > 0){
                var image = "http://www.nytimes.com/" + imagesArray[1].url;
                 $('#news2').append("<li class='article' data-id=" + id + "><img src=" + image + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + pubdate + "</p><p>" + abstract + "</p><button class='save-article'>Save</button></li>");
            } else {
                var image = "no image available"
                 $('#news2').append("<li class='article' data-id=" + id + "><h3><a target='_blank' href='" + url + "'>" + title + " </a></h3><p>" + pubdate + "</p><p>" + abstract + "</p><button class='save-article'>Save</button></li>");
            }

            if (loggedIn == true) {
                console.log("Show article saved button.");

                for (var j = 0; j < userArticles.length; j++) {
                    if (url === userArticles[j]) {
                        $("#news2 :last-child button").last().html("Saved to Dashboard");
                        $("#news2 :last-child button").last().prop("disabled",true);
                    }
                }
            }

            if (loggedIn == false) {
                $('.save-article').hide();
            }  

        } 

        pickedArticles = [];
    

}


$(function () {
    $('.news-header').hide();
    
    $("#news").on("click", ".save-article", function (event) {
        event.preventDefault();

        var articleTitle = $(this).closest('li').eq(0).find("h3").text();
        var articlePubdate = $(this).closest('li').eq(0).find("p").eq(0).text();
        var articleAbstract = $(this).closest('li').eq(0).find("p").eq(1).text();
        // var newDate = $(this).closest('li').eq(0).find("p").eq(1).text().split("T")[0];
        var articleUrl = $(this).closest('li').eq(0).find("a").attr("href");
        var articleImage = $(this).closest('li').eq(0).find("img").attr("src");

        var $that = $(this);

        $.ajax({
            type: "POST",
            url: "/articles",
            data: {
                article: {
                    title: articleTitle,
                    abstract: articleAbstract,
                    url: articleUrl,
                    pubdate: articlePubdate,
                    image: articleImage
                }
            },
            success: function (response) {
                console.log("Saving article successful.");
                $that.text("Saved to Dashboard");
                $that.prop("disabled",true);
            },
            error: function (response) {
                console.log("Saving article failed.");
            }
        });
    });

   
});