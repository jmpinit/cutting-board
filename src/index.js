var $ = require("jquery");

var Interactor = require("./interactor.js");
var Viewport = require("./viewport.js");
var Overlay = require("./overlay.js");

function loadImage (url, callback) {
    var image = new Image();
    image.src = url;

    image.onload = function () {
        callback(image);
    };
}

(function () {
    var canvas = $("#viewport")[0];

    var viewport = new Viewport(canvas);
    var overlay = new Overlay($("#overlay")[0]);
    var app = new Interactor(viewport, overlay);

    function resize () {
        $("#viewport")[0].width = $(window).width();
        $("#viewport")[0].height = $(window).height();

        $("#overlay").offset($("#viewport").offset());
        $("#overlay").attr("viewBox", "0 0 " + $("#viewport").width() + " " + $("#viewport").height());
        $("#overlay").width($("#viewport").width());
        $("#overlay").height($("#viewport").height());

        app.render();
    }

    $(window).resize(function() {
        resize();
    });

    resize();

    // connect event handlers

    $("#add").on("click", function () {
        var url = $("#url").val();

        loadImage(url, function (image) {
            app.addImage(image);
        });
    });

    $(document).on("mousewheel", app.scroll);

    $(document).click(function (e) {
        var rect = canvas.getBoundingClientRect();

        if (e.clientX > rect.left &&
                e.clientX < rect.left + canvas.width &&
                e.clientY > rect.top &&
                e.clientY < rect.top + canvas.height) {
            app.click(e.clientX - rect.left, e.clientY - rect.top);
        }
    });
})();
