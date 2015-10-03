module.exports = (function () {
    function Viewport (canvas) {
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
        this.scaleFactor = 1.0;
        this.images = [];
    }

    Viewport.prototype = {
        highlight: function (layerIndex) {
            if (layerIndex < this.images.length) {
                for (var i = 0; i < this.images.length; i++) {
                    this.images[i].opacity = 0.5;
                }
                
                this.images[layerIndex].opacity = 1.0;

                this.render();
            }
        },

        translate: function (x, y) {
            this.x = x;
            this.y = y;
            this.render();
        },

        scale: function (scaleFactor) {
            if (arguments.length === 0) {
                return this.scaleFactor;
            } else {
                this.scaleFactor = scaleFactor;
                this.render();
            }
        },

        render: function () {
            var ctx = this.canvas.getContext('2d');

            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            ctx.save();
            ctx.scale(this.scaleFactor, this.scaleFactor);
            ctx.translate(this.x, this.y);

            for (var i = 0; i < this.images.length; i++) {
                var img = this.images[i];
                ctx.globalAlpha = img.opacity;
                ctx.transform.apply(ctx, img.transform);
                ctx.drawImage(img.image, 0, 0);
            }
            ctx.restore();
        }
    }

    return Viewport;
})();
