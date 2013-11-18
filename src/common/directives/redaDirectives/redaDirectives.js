angular.module('redaDirectives', [], null)

    .directive
(
    'graph', function () {
        return {
            restrict: 'E',
            scope: {
                values: '='
            },
            link: function (scope) {
                scope.$watch('values', function (values) {
                    if (values) {

                        var width = 330,
                            height = 340,
                            radius = Math.min(width, height) / 2;

                        //  create colors from an ordinal scale
                        var color = d3.scale.ordinal()
                            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

                        // constructs a new arc generator
                        var arc = d3.svg.arc()
                            .outerRadius(radius - 10)
                            .innerRadius(15);

                        // construct a new default pie layout.
                        var pie = d3.layout.pie()
                            .sort(null)
                            .value(function (d) {
                                return d.population;
                            });

                        // select an element -> #charted div : to append the pischart to it
                        var svg = d3.select("#charted").append("svg")
                            .attr("width", width) // set width
                            .attr("height", height) // set height

                            .append("g")
                            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                        //  Assemble the calculated arcs to have a full circle

                        values.forEach(function (d) {
                            d.population = +d.population;
                        });

                        var g = svg.selectAll(".arc")
                            .data(pie(values))
                            .enter().append("g")

                            .attr("class", "arc");

                        g.append("path")
                            .attr("d", arc)
                            .style('stroke', '#fff')  // style for the line that separate every arc
                            .style('stroke-width', 1.5)
                            .style("fill", function (d) {
                                return color(d.data.age);
                            });

                        g.append("text")
                            .attr("transform", function (d) {
                                return "translate(" + arc.centroid(d) + ")";
                            })
                            .attr("dy", ".35em")
                            .style('fill', '#fff') // make the color of the text white
                            .style("text-anchor", "middle")

                            .text(function (d) {
                                return d.data.age;
                            });

                    }
                })
            }
        }
    }
);