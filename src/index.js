var $ = require("jquery");

var state = {
    images: []
};

function render () {
    var canvas = $("#viewport")[0],
        ctx = canvas.getContext('2d');

    for (var i = 0; i < state.images.length; i++) {
        ctx.drawImage(state.images[i], 0, 0);
    }
}

function loadImage (url, callback) {
    var image = new Image();
    image.src = url;
    image.onload = function() {
        callback(image);
    };
}

$("#add").on("click", function () {
    var url = $("#url").val();

    loadImage(url, function (image) {
        state.images.push(image);
        render();
    });
});

function resize () {
    $("#viewport")[0].width = $(window).width();
    $("#viewport")[0].height = $(window).height();
    render();
}

function init () {
    $( window ).resize(function() {
        resize();
    });

    resize();
}

init();
