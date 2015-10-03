function render (canvas, state) {
    var ctx = canvas.getContext('2d');

    for (var i = 0; i < state.images.length; i++) {
        var img = state.images[i];
        ctx.transform.apply(ctx, img.transform);
        ctx.drawImage(img.image, 0, 0);
    }
}

exports.render = render;
