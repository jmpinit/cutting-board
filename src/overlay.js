var d3 = require("d3");

var state = {
    points: []
};

function render () {
    var outline = d3.select("#overlay").select("polyline");

    if (outline.empty()) {
        var line = d3.svg.line()
            .x(function(d, i) { return d.x; })
            .y(function(d, i) { return d.y; });

        outline = d3.select("#overlay")
            .append("path")
            .datum(state.points)
            .attr("class", "outline")
            .attr("d", line)
    }
}

exports.click = function (x, y) {
    state.points.push({
        x: x,
        y: y
    });
    render();
};
