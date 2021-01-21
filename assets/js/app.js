//set initial parameters
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

//set up function used for updating x scale
function xScale(data, chosenXAxis, chartWidth) {
    var xLinearScale = d3.scaleLiner()
        .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
            d3.max(data, d => d[chosenXAxis]) * 1.1])
        .range([0, chartWidth]);
    return xLinearScale;
}
//set up function used for updating y scale
function yScale(data, chosenYAxis, chartHeight) {
    var yLinearScale = d3.scaleLiner()
        .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
            d3.max(data, d => d[chosenYAxis]) * 1.1])
        .range([chartHeight, 0]);
    return yLinearScale;
}
//set up function used for updating XAxis
function renderXAxis(newXScale, XAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    XAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return XAxis;
}
//set up function used for updating XAxis
function renderYAxis(newYScale, YAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    YAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return YAxis;
}

//set up function used for updating chart circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", data => newXScale(data[chosenXAxis]))
        .attr("cy", data => newYScale(data[chosenYAxis]));

    return circlesGroup;
}

//set up function used for updating labels with a transition
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
    textGroup.transition()
        .duration(1000)
        .attr("x", data => newXScale(data[chosenXAxis]))
        .attr("y", data => newYScale(data[chosenYAxis]));

    return textGroup;
}

//set up function used for updating circles with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {
    if (chosenXAxis ==="poverty") {
        var xlabel = "Poverty: ";
    } else if (chosenXAxis === "income") {
        var xlabel = "Median Income: "
    } else {
        var xlabel = "Age: "
    }

    if (chosenYAxis === "healthcare") {
        var ylabel = "Lack of Healthcare: ";
    } else if (chosenYAxis === "smokes") {
        var ylabel = "Smokers: "
    } else {
        var ylabel = "Obesity: "
    }

    var toolTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-8, 0])
    .html(function(d) {
        return (`${d.state}<br>${xLabel} ${styleX(d[chosenXAxis], chosenXAxis)}<br>${yLabel} ${d[chosenYAxis]}%`);
  });

  circlesGroup.call(toolTip);
    }


// set up svg dimensions
var svgwidth = window.innerHeight/1.2;
var svgheight = window.innerWidth/1.7;

//set up borders
var margin = {
    top: 20,
    right: 40,
    bottom: 200,
    left: 100
};

//calculate the chart's height and width
var height = svgheight - margin.top - margin.bottom;
var width = svgwidth - margin.right - margin.left;

//append a div classed chart to the scatter elements
var chart = d3.select("#scatter").append("div").classed("chart", true);

//append a svg element to the chart with height and width
var svg = chart.append("svg")
    .attr("width", svgwidth)
    .attr("height", svgheight);

//append an chartgroup
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

