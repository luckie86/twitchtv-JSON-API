/**
 * Created by Luka on 15. 07. 2017.
 */

$(document).ready(function() {
    var idNumber = "n394ww5dzm22m6gxg7m3xorsefl4f1";
    var url = "https://api.twitch.tv/kraken/streams/freecodecamp";

    $.ajax({
        type: "GET",
        url: url,
        headers: {
            "client-ID": idNumber
        },
        success: function (data1) {
            if (data1.stream === null) {
                $("#fccStatus").html("freeCodeCamp is currently OFFLINE");
            } else {
                $("#fccStatus").html("freeCodeCamp is currently LIVE");
            }
        }
    });

    var url2 = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels";
    $.ajax({
        type: "GET",
        url: url2,
        headers: {
            "client-ID": idNumber
        },
        success: function (data2) {
           for (var i=0; i<data2.follows.length; i++) {
               var displayName = data2.follows[i].channel.display_name;
               var logo = data2.follows[i].channel.logo;
               var status = data2.follows[i].channel.status;

               if(logo===null) {
                   logo = "https://indiecrowdfunder.azureedge.net/content/images/no-logo.png";
               }

               $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>" + "<img src='"+ logo + "'>" + "</div>" +
               "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div>" + "</div>");
           }
        }
    });

    var deletedFollowers = ["brunofin", "comster404"];
    for (var j=0; j<deletedFollowers.length; j++) {
        var url3 = "https://api.twitch.tv/kraken/streams/"+deletedFollowers[j];
        $.ajax({
        type: "GET",
        url: url3,
        headers: {
            "client-ID": idNumber
        },
        success: function (data3) {
            console.log(data3);
            var logo = "http://4.bp.blogspot.com/-kTTBC3LNJog/UVso01Boc-I/AAAAAAAAA0U/buCV1Dc6R2s/s1600/logo.png";
            var displayName = data3.statusText;
            var status = data3.status;

            $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>" + "<img src='"+ logo + "'>" + "</div>" +
                "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div>" + "</div>");

        }
        });
    }
});
