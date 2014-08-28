//gives browser instruction to run on load and adds it as a procedure so that other scripts will also run
if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            varInterpGraphIt();
        };
        window.onload = newonload;
} else {
    window.onload = varInterpGraphIt();
}

function varInterpGraphIt(){ //hugely important. defines scope of variables 
var containerWidth = parseInt(d3.select("#varInterpGraphic").style("width"),10); //little trick

var margin = {top: 20, right: 20, bottom: 30, left: (containerWidth/10)},
    width = containerWidth - margin.left - margin.right, 
    height = containerWidth - margin.top - margin.bottom;

var x1 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y1 = d3.scale.linear()
    .range([height, 0]);

var xAxis1 = d3.svg.axis()
    .scale(x1)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left")
    .ticks(10, "%");

var svg1 = d3.select("#varInterpGraphic").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//http://localhost:8080/varInterp 
d3.tsv("http://www.visualizeclinvar.org/varInterp"+pageName+".tsv", type, function(error, data) { //pageName comes from the page: see html
  x1.domain(data.map(function(d) { return d.Interpretation; }));
  y1.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis1)
    .selectAll("text")
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(20)")
      .style("text-anchor", "start");
      
  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg1.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x1(d.Interpretation); })
      .attr("width", x1.rangeBand())
      .attr("y", function(d) { return y1(d.frequency); })
      .attr("height", function(d) { return height - y1(d.frequency); });

});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}
}