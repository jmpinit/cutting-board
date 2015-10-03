var $ = require("jquery");

var viewport = require("./viewport.js");
var overlay = require("./overlay.js");

var state = {
    images: []
};

function loadImage (url, callback) {
    var image = new Image();
    image.src = url;

    image.onload = function () {
        callback(image);
    };
}

function resize () {
    $("#viewport")[0].width = $(window).width();
    $("#viewport")[0].height = $(window).height();

    $("#overlay").offset($("#viewport").offset());
    $("#overlay").attr("viewBox", "0 0 " + $("#viewport").width() + " " + $("#viewport").height());
    $("#overlay").width($("#viewport").width());
    $("#overlay").height($("#viewport").height());

    viewport.render($("#viewport")[0], state);
}

(function () {
    var canvas = $("#viewport")[0];

    $("#add").on("click", function () {
        var url = $("#url").val();

        loadImage(url, function (image) {
            state.images.push({
                image: image,
                transform: [1, 0, 0, 1, 0, 0]
            });

            viewport.render(canvas, state);
        });
    });

    $(window).resize(function() {
        resize();
    });

    resize();

    $(document).click(function (e) {
        var rect = canvas.getBoundingClientRect();

        if (e.clientX > rect.left &&
                e.clientX < rect.left + canvas.width &&
                e.clientY > rect.top &&
                e.clientY < rect.top + canvas.height) {
            overlay.click(e.clientX - rect.left, e.clientY - rect.top);
        }
    });
})();
