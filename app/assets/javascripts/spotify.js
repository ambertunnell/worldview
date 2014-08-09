// $(function() {

//   $('.music-header').hide();

//   var countryCode = 'us'; // get country code;
//   var mostStreamedData = 'http://charts.spotify.com/api/tracks/most_streamed/' + countryCode + '/weekly/latest';

//   $(".ul-clock").click(function () {

//     $('.music-header ul').empty();
//     $('.music-header').show();

//     $.ajax({
//       url: mostStreamedData,
//       type: 'GET',
//       data: 'text/plain',
//       dataType: 'jsonp',
//       success: function(response){

//         for (var i = 0; i < 5; i++) {
//           var artist = response.tracks[i].artist_name;
//           var track = response.tracks[i].track_name;
//           $('.music-header ul').append("<li class='music'>" + track + " by " + artist + "</li><br>")
//           console.log(track+' by '+artist);
//         }

      

//       },
//       error: function(response){
//         console.log("nope");
//       }

//     });

//   });

// });
