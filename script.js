Handlebars.templates = {};

var templates = document.querySelectorAll('template');

Array.prototype.slice.call(templates).forEach(function(tmpl) {
    Handlebars.templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML.replace(/{{&gt;/g, '{{>'));
});
$(".last").hide();
var input;
var select = "Artist";
var offset = 0;

$(document).on('keyup', function() {
    input = $("input").val();
});

$("button").on('click', function() {
    $("div").last().removeClass("get-more");
    $(".main").remove();
    var artists = {
        artists: []
    };
    var albums = {
        albums: []
    };
    $.ajax({
        url: 'https://elegant-croissant.glitch.me/spotify',
        method: 'GET',
        data: {
            q: input,
            type: select
        },
        success: function(data) {
            if (select == "album") {
                var payload = data.albums.items;
                for (var i = 0; i < payload.length; i++) {
                    if (payload[i].images[0] == undefined) {
                        albums.albums[i] = {};
                        albums.albums[i].name = payload[i].name;
                        albums.albums[i].photo = 'placeholder.jpg';
                        albums.albums[i].url = payload[i].external_urls.spotify;
                        albums.albums[i].artist = payload[i].artists[0].name;
                        continue;
                    }
                    albums.albums[i] = {};
                    albums.albums[i].name = payload[i].name;
                    albums.albums[i].photo = payload[i].images[1].url;
                    albums.albums[i].url = payload[i].external_urls.spotify;
                    albums.albums[i].artist = payload[i].artists[0].name;
                }
                $(Handlebars.templates.albums(albums)).appendTo($("#results")).hide().fadeIn();
                if ($(".main").length > 19) {
                    $(".last").show().addClass("get-more");
                }
            } else {
                payload = data.artists.items;
                for (i = 0; i < payload.length; i++) {
                    if (payload[i].images[0] == undefined) {
                        artists.artists[i] = {};
                        artists.artists[i].name = payload[i].name;
                        artists.artists[i].photo = 'placeholder.jpg';
                        artists.artists[i].url = payload[i].external_urls.spotify;
                        continue;
                    }

                    artists.artists[i] = {};
                    artists.artists[i].name = payload[i].name;
                    artists.artists[i].photo = payload[i].images[1].url;
                    artists.artists[i].url = payload[i].external_urls.spotify;
                }
                $(Handlebars.templates.artists(artists)).appendTo($("#results")).hide().fadeIn();
                if ($(".main").length > 19) {
                    $(".last").show().addClass("get-more");
                }
            }
        }
    });
});
$(".last").on('click', function() {
    offset += 20;
    $(".last").fadeOut(500);
    var artists = {
        artists: []
    };
    var albums = {
        albums: []
    };
    $.ajax({
        url: 'https://elegant-croissant.glitch.me/spotify',
        method: 'GET',
        data: {
            q: input,
            type: select,
            offset: offset
        },
        success: function(data) {
            if (select == "album") {
                var payload = data.albums.items;
                for (var i = 0; i < payload.length - 1; i++) {
                    if (payload[i].images[0] == undefined) {
                        albums.albums[i] = {};
                        albums.albums[i].name = payload[i].name;
                        albums.albums[i].photo = 'placeholder.jpg';
                        albums.albums[i].url = payload[i].external_urls.spotify;
                        albums.albums[i].artist = payload[i].artists[0].name;
                        continue;
                    }
                    albums.albums[i] = {};
                    albums.albums[i].name = payload[i].name;
                    albums.albums[i].photo = payload[i].images[1].url;
                    albums.albums[i].url = payload[i].external_urls.spotify;
                    albums.albums[i].artist = payload[i].artists[0].name;
                }
                $(Handlebars.templates.albums(albums)).appendTo($("#results")).hide().fadeIn();
                if ($(".main").length > 18 + offset) {
                    $(".last").fadeIn(500).addClass("get-more");
                }
            } else {
                payload = data.artists.items;
                for (i = 0; i < payload.length; i++) {
                    if (payload[i].images[0] == undefined) {
                        artists.artists[i] = {};
                        artists.artists[i].name = payload[i].name;
                        artists.artists[i].photo = 'placeholder.jpg';
                        artists.artists[i].url = payload[i].external_urls.spotify;
                        continue;
                    }
                    artists.artists[i] = {};
                    artists.artists[i].name = payload[i].name;
                    artists.artists[i].photo = payload[i].images[1].url;
                    artists.artists[i].url = payload[i].external_urls.spotify;
                }
                $(Handlebars.templates.artists(artists)).appendTo($("#results")).hide().fadeIn();
                if ($(".main").length > 18 + offset) {
                    $(".last").fadeIn(500).addClass("get-more");
                }
            }
        }
    });
});

$("#search").on('click', ".down-btn", function fn1() {
    $(".down-btn").css("background-color", "rgb(45,45,45)");
    $(".hide").css({top: "50px", border: "solid white 1px", borderWidth: "0 1px 1px 1px"});
    $(".show").css("borderWidth", "1px 1px 0px 1px");
    $("#select").css("borderWidth", "0 1px 0 1px");
    $(".down-btn").addClass("toggled");
    $("#search").on('click.clickBack', ".down-btn.toggled", function() {
        $(".down-btn").css("background-color", "#282828");
        $(".hide").css({top: "0", border: "solid white 1px", borderWidth: "1px 1px 1px 1px"});
        $(".show").css("borderWidth", "1px 0px 1px 1px");
        $("#select").css("borderWidth", "1 0px 1 1px");
        $(".down-btn").removeClass("toggled");

    });
});

$("#select").on('click', ".hide", function() {
    $(".down-btn").css("background-color", "#282828");
    $(".hide").css({top: "0", border: "solid white 1px", borderWidth: "1px 1px 1px 1px"});
    $(".show").css("borderWidth", "1px 0px 1px 1px");
    $("#select").css("borderWidth", "1 0px 1 1px");
    $(".down-btn").removeClass("toggled");
    $(".art").toggleClass("show");
    $(".art").toggleClass("hide");
    $(".alb").toggleClass("show");
    $(".alb").toggleClass("hide");
    select = $(".show").children().html().toLowerCase().slice(0, -1);

});
$(document).on("keydown", function(e) {
    if (e.keyCode == 13) {
        $("button").trigger('click');
    }
});
