module.exports = (function () {
    function Viewport (canvas) {
        this.canvas = canvas;
        this.images = [];
    }

    Viewport.prototype = {
        render: function () {
            var ctx = this.canvas.getContext('2d');

            for (var i = 0; i < this.images.length; i++) {
                var img = this.images[i];
                ctx.transform.apply(ctx, img.transform);
                ctx.drawImage(img.image, 0, 0);
            }
        }
    }

    return Viewport;
})();
