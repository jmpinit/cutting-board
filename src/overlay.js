var d3 = require("d3");

module.exports = (function () {
    function Overlay (svg) {
        this.svg = svg;
        this.points = [];
    }

    Overlay.prototype = {
        render: function () {
            var outline = d3.select("#overlay").select("polyline");

            if (outline.empty()) {
                var line = d3.svg.line()
                    .x(function(d, i) { return d.x; })
                    .y(function(d, i) { return d.y; });

                outline = d3.select("#overlay")
                    .append("path")
                    .datum(this.points)
                    .attr("class", "outline")
                    .attr("d", line)
            }
        },

        addPoint: function (x, y) {
            this.points.push({
                x: x,
                y: y
            });
        }
    }

    return Overlay;
})();
