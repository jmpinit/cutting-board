module.exports = (function () {
    function Interactor (viewport, overlay) {
        this.viewport = viewport;
        this.overlay = overlay;
    }

    Interactor.prototype = {
        render: function () {
            this.viewport.render();
            this.overlay.render();
        },

        addImage: function (image) {
            this.viewport.images.push({
                image: image,
                transform: [1, 0, 0, 1, 0, 0]
            });

            this.render();
        },

        scroll: function (e) {
            var wheelDelta = e.originalEvent.wheelDelta;

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
