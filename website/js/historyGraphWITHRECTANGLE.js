//need to change so that tsv file is a passed invariable related to name of page!
//gives browser instruction to run on load and adds it as a procedure so that other scripts will also run
if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            historyGraphIt();
        };
        window.onload = newonload;
} else {
    window.onload = historyGraphIt();
}
//taken from http://stackoverflow.com/questions/641857/javascript-window-resize-event I apologize for complexity
//
var addEvent = function(elem, type, eventHandle) {
    if (elem == null || typeof(elem) == 'undefined') return;
    if ( elem.addEventListener ) {
        elem.addEventListener( type, eventHandle, false );
    } else if ( elem.attachEvent ) {
        elem.attachEvent( "on" + type, eventHandle );
    } else {
        elem["on"+type]=eventHandle;
    }
};

//addEvent(window, "resize", historyGraphIt);

//another thought - have graph files all in one js file
//but above code takes variable page name into account - will then have proper functions used with proper tsvs
//would need a 'loader' script function for each page...hmm, would be faster but lets not complicate things at the moment

function historyGraphIt(){ //hugely important. defines scope of variables 
  console.log("called historyGraphIt()");
var containerWidth = parseInt(d3.select("#historyGraphic").style("width"),10); //little trick

var margin = {top: 20, right: 20, bottom: 30, left: (containerWidth/7)},
    width = containerWidth- margin.left - margin.right, //select and style give us access to the historyGraphic objects width - kinda of useful for sizing the graphic to fit historyGraphic container on html page
    height = containerWidth - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	.ticks(d3.time.years, 1)
    .tickSize(0)
    .tickPadding(8);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
	.ticks(6)
	.tickFormat(d3.format(".2s"));

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.number); });

var svg = d3.select("#historyGraphic").append("svg")
//.attr("viewBox",0 0 250 75)
	//.attr("preserveAspectRatio",xMinYMin meet)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//background for colouring
  svg.append("g").append("rect")
	.attr("x",0)
	.attr("y",0)
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	//.style("fill",black);
	
//http://localhost:8080/history data/history/
var history_tsv = ["history", pageName].join('') // this takes care of null pageName
d3.tsv("http://localhost:8080/"+history_tsv+".tsv", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.number = +d.number;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.number; }));


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
	  .style("fill","#999999");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
	  .style("fill","#999999");
    //.append("text")
    //  .attr("transform", "rotate(-90)")
    //  .attr("y", 6)
    //  .attr("dy", ".71em")
    //  .style("text-anchor", "end")
    //  .text("ClinVar IDs ");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
	  .style("stroke","#F73A18");;
});
}
