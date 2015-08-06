//need to change so that tsv file is a passed invariable related to name of page!
//gives browser instruction to run on load and adds it as a procedure so that other scripts will also run
$(
  //another thought - have graph files all in one js file
  //but above code takes variable page name into account - will then have proper functions used with proper tsvs
  //would need a 'loader' script function for each page...hmm, would be faster but lets not complicate things at the moment

  function historyGraphIt(){ //hugely important. defines scope of variables
    console.log("called historyGraphIt()");
    var containerWidth = parseInt(d3.select(".graph.historyGraph").style("width"),10); //little trick
	var containerHeight = parseInt(d3.select(".graph.historyGraph").style("height"),10); //little trick

    var margin = {top: 20, right: 20, bottom: 30, left: (containerWidth/6)},
        width = containerWidth- margin.left - margin.right, //select and style give us access to the historyGraphic objects width - kinda of useful for sizing the graphic to fit historyGraphic container on html page
        height = (0.9*containerWidth) - margin.top - margin.bottom;

    var parseDate = d3.time.format("%d-%b-%y").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
	.ticks(d3.time.years)
        .tickSize(0)
        .tickPadding(8);

    function be_xAxis() {
      return xAxis;
    }

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
	.ticks(6)
	.tickFormat(d3.format(".2s"),7)
	.tickSize(0)
        .tickPadding(8);

    function be_yAxis() {
      return yAxis;
    }

    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.number); });

    var lineSmooth = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.number); })
	.interpolate("bundle")
	.tension(0.5);

    var svg = d3.select(".graph.historyGraph").append("svg").attr("viewBox", "0 0 "+containerHeight+" "+containerWidth )
	.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
	.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //.attr("viewBox",0 0 250 75)
    //.attr("preserveAspectRatio",xMinYMin meet)
    //svg.append("g").attr("class","rect")
    //.attr("transform", "translate(" + -margin.left + "," + -margin.top + ")")
    //.attr("transform", "translate(" -1*margin.left + "," -1*margin.top + ")")
    //.append("rect")
    //.attr("x",0)
    //.attr("y",0)
    //.attr("width", width + margin.left + margin.right)
    //.attr("height", height + margin.top + margin.bottom);


    //svg


    //http://localhost:8080/history data/history/
    d3.tsv(gon.tsv_paths['historyGraph'], function(error, data) {
      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.number = +d.number;
      });

      // x.domain(d3.extent(data, function(d) { return d.date; }));
      //y.domain(d3.extent(data, function(d) { return d.number; }));
      x.domain( [d3.min(data,function(d) { return d.date; }), d3.max(data,function(d) {
	var extraYear = new Date();
	extraYear.setTime(d3.max(data,function(d) {return d.date; }).getTime());
	extraYear.setFullYear(d3.max(data,function(d) {return d.date; }).getFullYear() + 1);
	return extraYear;
      })]); //adding a year
      y.domain([d3.min(data,function(d) { return d.number; }), d3.max(data,function(d) { return d.number; }) + (d3.max(data,function(d) { return d.number; })/10)]);

      if(containerWidth > 200) { //for switching to viewable for large view
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
	  .selectAll("text")
	  .style("font-size", function() {
	    if ((width/15) > 25) {
	      return 25+"px";
	    }
	    return (width/15)+"px";
	  });


        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
	  .selectAll("g")
	  .selectAll("text")
	  .style("font-size", function() {
	    if ((width/15) > 25) {
	      return 25+"px";
	    }
	    return (width/15)+"px";
	  });
      }

      if(containerWidth > 200) { //large view path
     //   svg.append("path")
     //     .datum(data)
      //    .attr("class", "line")
	 // .attr("id","histryGraphPath")
	// //.attr("marker-end","url(#markerArrow)")
     //     .attr("d", line);
	 
	        svg.append("path")
          .datum(data)
          .attr("class", "line")
	  .attr("id","histryGraphPath")
	  .attr("marker-end","url(#markerArrow)")
          .attr("d", lineSmooth);

        svg.append("defs")
	  .append("marker")
	  .attr("id","markerArrow")
	  .attr("viewBox","0 -5 15 15")
	  .attr("markerWidth","6")
	  .attr("markerHeight","4.5")
	  .attr("refx","5")
	  .attr("refy","0")
	  .attr("orient","auto")
	  .attr("markerUnits","strokeWidth")
	  .attr("class","arrowMarker")
	  .append("svg:path")
	  .attr("d","M 0 0 L 10 5 L 0 10 z")
	  .attr("transform", "translate(0,-5)");	  
		  

      }
      if(containerWidth <= 200) { //flashy for small view

        var numberFontSize = containerWidth/8;

        svg.append("path")
          .datum(data)
          .attr("class", "line")
	  .attr("id","histryGraphPath")
	//make room for words
	  .attr("transform","translate(0,"+ numberFontSize +")")
	  .attr("marker-end","url(#markerArrow)")
          .attr("d", lineSmooth);

        svg.append("defs")
	  .append("marker")
	  .attr("id","markerArrow")
	  .attr("viewBox","0 -5 15 15")
	  .attr("markerWidth","6")
	  .attr("markerHeight","4.5")
	  .attr("refx","5")
	  .attr("refy","0")
	  .attr("orient","auto")
	  .attr("markerUnits","strokeWidth")
	  .attr("class","arrowMarker")
	//.style("fill","#F73A18")
	  .append("svg:path")
	  .attr("d","M 0 0 L 10 5 L 0 10 z")
	  .attr("transform", "translate(0,-5)");
        //number, first element of data only, and time
        //Number
        //increase in NAME
        //In X Months

        svg.append("g")
	  .selectAll("text")
	  .data(data.slice(-2,-1))//function(){return data[0];}) //only element 1
	  .enter().append("text")
	  .style("font-size",numberFontSize+ "px")
	  .append("tspan")
	  .style("fill","#F73A18")
	  .attr("class","graphicNumber")
	  .text(function(d) { //add some commas
	    //console.log(d);
	    return d.number.toLocaleString();//toLocaleString should be supported, from what I have read, by most browsers. Does not work for decimal numbers.
	  })
	  .append("tspan") //tspan allows us to have multiple lines
	  .attr("class", "graphicWords")
	  .attr("dx",function(d){ return 0.5*(-(d.number.toLocaleString()).length)*numberFontSize+"px";})
	  .attr("dy",0.75*numberFontSize+"px")
	  .style("font-size", 0.5*numberFontSize + "px")
	  .text(function(d) {
	    var months = (d.date.getFullYear() - data[0].date.getFullYear())*12; //start by number of years
	    months = months + d.date.getMonth();
	    months = months - data[0].date.getMonth();
	    return "VARIANTS IN "+ months +" MONTHS" ;
	  });
	//	.append("tspan") //tspan allows us to have multiple lines
	//	.attr("class", "graphicWords")
	//	.attr("dx",0.5*(containerWidth*30/320)+"px")
	//	.text("IN "+90+" MONTHS")
      }

      if(containerWidth > 200) { //for switching to viewable for small view
        // Draw the x Grid lines
        svg.append("g")
          .attr("class", "x grid")
          .attr("transform", "translate(0," + height + ")")
          .call(be_xAxis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
               );

        // Draw the y Grid lines
        svg.append("g")
          .attr("class", "y grid")
          .call(be_yAxis()
                .tickSize(-width, 0, 0)
                .tickFormat("")
               );
      }

    });
  }
)
