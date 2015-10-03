var mousetrap = require("mousetrap");

module.exports = (function () {
    function ViewMode (viewport) {
        this.viewport = viewport;

        this.x = 0;
        this.y = 0;
        this.zoomPos = 0.5;
        this.speed = 100;

        this.keys = {
            "h": this.left,
            "j": this.down,
            "k": this.up,
            "l": this.right
        };

        this.center();
        this.zoom(0);
        this.bind();
    }

    ViewMode.prototype = {
        center: function () {
            this.pos = { x: 0, y: 0 };
        },

        left: function () {
            this.x += this.speed;
            this.viewport.translate(this.x, -this.y);
        },

        down: function () {
            this.y += this.speed;
            this.viewport.translate(this.x, -this.y);
        },

        up: function () {
            this.y -= this.speed;
            this.viewport.translate(this.x, -this.y);
        },

        right: function () {
            this.x -= this.speed;
            this.viewport.translate(this.x, -this.y);
        },

        zoom: function (delta) {
            var normDelta = delta / 120 / 100;

            this.zoomPos += normDelta;
            if (this.zoomPos < 0) this.zoomPos = 0;
            if (this.zoomPos > 1) this.zoomPos = 1;

            var scale = Math.pow(this.zoomPos, 2);

            this.viewport.scale(scale);
        },

        bind: function () {
            for (key in this.keys) mousetrap.bind(key, this.keys[key].bind(this));
        },

        unbind: function () {
            for (key in this.keys) mousetrap.unbind(key);
        }
    }

    function Interactor (viewport, overlay) {
        this.viewport = viewport;
        this.viewmode = new ViewMode(viewport);
        this.overlay = overlay;

        var that = this;
        function makeHighlighter (i) {
            return function () {
                that.viewport.highlight(i);
            };
        }

        var layerKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        for (var i = 0; i < layerKeys.length; i++) {
            mousetrap.bind(layerKeys[i], makeHighlighter(i));
        }
    }

    Interactor.prototype = {
        render: function () {
            this.viewport.render();
            this.overlay.render();
        },

        addImage: function (image) {
            this.viewport.images.push({
                image: image,
                opacity: 1.0,
                transform: [1, 0, 0, 1, 0, 0]
            });

            this.render();
        },

        scroll: function (e) {
            var wheelDelta = e.originalEvent.wheelDelta;
            this.viewmode.zoom(wheelDelta);
        },

        drag: function () {
            // TODO
        },

        click: function (x, y) {
            this.overlay.addPoint(x, y);
            this.overlay.render();
        }
    }

    return Interactor;
})();
