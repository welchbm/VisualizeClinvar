//person responsible for this D3 js design: Bret Heale reached at bheale@gmail.com
//comments always welcome

$(document).ready(function () {
  //http://localhost:8080/quickStats
  //d3.tsv("quickStats"+pageName+".tsv", type, function(error, data) {
  //d3.select("body").append("text").text("I wrote on your page");

  function parseGeneBubbleDate (dateString) {//strange format in TSV for date aaa####?
    dateString = dateString.toUpperCase();
    dateString = dateString.replace(/(\w+)(\d\d\d\d)/,'$1 1, $2');
    return dateString;
  }

  var width = parseInt(d3.select("#geneBubbleIc").style("width"),0);

  var height = parseInt(d3.select("#geneBubbleIc").style("width"),0) - 100; // item should be mostly square, only works based off width
  var margin = 50;

  d3.tsv("tsv/geneBubble/geneBubble.tsv", function(myData) {
    //d3.tsv("data/geneBubble/geneBubble.tsv",function(myData) {

    myData.forEach(function(d) {
      //console.log(d.Date);
      d.Date = parseGeneBubbleDate(d.Date);
      //console.log(d.Date);
    });



    var svg=d3.select("#geneBubbleIc").append("svg")
	.attr("viewBox","0 0 "+(width)+" "+(height))
	.style("overflow","hidden")
	.attr("preserveAspectRatio","xMidYMin slice")
	.attr("width",width)
	.attr("height",height)
	.append("g")
	.attr("class","bubbleContainer")
	.attr("width",(width-margin)).attr("height",(height-margin)).attr("transform", "translate(" + (0.5*margin) + "," + 0 +")");

    width = (width-margin); //adjust to width of g element
    height = (height-margin); //adjust to height of g element

    //dropdown for selecting CLinvar release
    var uniqueDates = {};
    var datesDropDown = [];
    i = 0;
    datesDropDown.push(myData[0].Date);
    for( i in myData){
      if( typeof(uniqueDates[myData[i].Date]) == "undefined"){
	datesDropDown.push(myData[i].Date);
      }
      uniqueDates[myData[i].Date] = 0;
    }

    datesDropDown.sort(function (a, b) { return Date.parse(a) - Date.parse(b);});//(function(a,b) {return b-a;});

    //clean out day
    myData.forEach(function(d) {
      //console.log(d.Date);
      d.Date = removeDay(d.Date);
      //console.log(d.Date);
    });
    function removeDay (dateString) {//strange format in TSV for date aaa####?
      dateString = dateString.replace(/(\w+) 1, (\d\d\d\d)/,'$1 $2');
      return dateString;
    }
    for( i in datesDropDown) {
      datesDropDown[i] = datesDropDown[i].replace(/(\w+) 1, (\d\d\d\d)/,'$1 $2');
      //console.log(datesDropDown[i]);
    }

    d3.select("#geneBubbleIc").append("select").attr("id","geneBubblesDates").attr("class", "form-control").append("option").text("Please select a date");
    //d3.select("body")
    //.append("select")
    d3.select("#geneBubblesDates")
      .selectAll("option")
      .data(datesDropDown)
      .enter()
      .append("option")
    // Provide available text for the dropdown options
      .attr("value",function(d) {return d;})
      .text(function(d) {return d;});

    //myData = myData.filter(function(d) { return (+d.numVariant) > 500 ; });

    // we sort the data to make it easier to have big circles in back and small ones overlaid in front
    myData.sort(function(a,b) {return b.numVariant-a.numVariant;});

    //Gene	MostFrequentPhenotype	numVariant	numPhenotypes	Date	MostFrequentInterpretation
    //We are scaling everything by the total number of max and min number of varients occurring over all Genes for every version of Clinvar
    //this ensures that showing data for each year will be comparable
    //That means that as the years progress circles will move up and to the left
    //but never out of the axis. And, color and size will be relative to maximum max.
    //In short, improves ability to compare historical data overtime
    //we rely upon the viewers short term memory and ability to judge color shading
    //Trust me there are good cognitive reasons :O)
    var maxVariants = d3.max(myData, function(d){return +d.numVariant;});
    var minVariants = d3.min(myData, function(d){return +d.numVariant;});
    var maxPhenotypes = d3.max(myData, function(d){return +d.numPhenotypes;});
    var minPhenotypes = d3.min(myData, function(d){return +d.numPhenotypes;});
    //for domain need max number variants in genes use it for max of range
    //biggest circle has range max
    var r=d3.scale.linear().domain([minVariants,maxVariants]).range([2,50]);
    var o=d3.scale.linear().domain([minVariants,maxVariants]).range([.8,1]);

    //nest by date, sort and rebuild myData
    //use only the top 101
    //	var nestMyData = d3.nest().key(function(d) {return d.Date}).entries(myData);
    //myData = myData.slice(0,100); //done here so that radius scaling as already been done

    //PARSE myData.selectAll(MostFrequentInterpretation) for unique and put array below
    //also include legend somewhere for the Interpretation types
    var uniqueInterpretations = {};
    var distinctInterpretations = [];
    var i = 0;
    //uniqueInterpretations[myData[0].MostFrequentInterpretation] = 0;
    for( i in myData){
      if( typeof(uniqueInterpretations[myData[i].MostFrequentInterpretation]) == "undefined"){
	distinctInterpretations.push(myData[i].MostFrequentInterpretation);
      }
      uniqueInterpretations[myData[i].MostFrequentInterpretation] = 0;
    }
    var c=d3.scale.ordinal().domain(distinctInterpretations).range(["#DAE9F2", "#FF9380","#B08996","#A9DF93","#F3E779","#DAE9F2", "#FF9380","#B08996","#A9DF93","#F3E779","#DAE9F2", "#FF9380","#B08996","#A9DF93","#F3E779","#DAE9F2", "#FF9380","#B08996","#A9DF93","#F3E779","#DAE9F2", "#FF9380","#B08996","#A9DF93","#F3E779"]);
    //.category20().domain(distinctInterpretations);//names to grab colors

    //x and y for placement....hmmm
    var x=d3.scale.log().domain([1,maxPhenotypes]).range([margin,width-margin]);
    var y=d3.scale.linear().domain([1,maxVariants]).range([height-margin,margin]);

    var formatAxis = function(d){
      var log = Math.log(d) / Math.LN10;
      return Math.abs(Math.round(log) - log) < 1e-6 ? 10+"^"+log : '';
    };
    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.tickFormat(formatAxis)
	.ticks(4)
	.tickSize(0);

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(3)
	.tickSize(0);

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (height - margin) + ")")
      .call(xAxis)
      .append("text")
      .style("text-anchor", "middle")
      .text("Number of Distinct Phenotypes")
      .attr("x", x((maxPhenotypes/20)))
      .attr("y",margin-15);

    svg.append("g")
      .attr("class", "axis")
      .attr("id","y-axis")
      .attr("transform", "translate(" + margin + ",0)")
      .call(yAxis)
      .append("text")
      .style("text-anchor", "middle")
      .text("Number of Variants")
      .attr("transform","rotate(-90)") //changes x to y and y to x
      .attr("x",-180)
      .attr("y",margin - 110);

    svg.selectAll(".h").data(d3.range(-8,10,2)).enter()
      .append("line").classed("h",1)
      .attr("x1",margin).attr("x2",height-margin)
      .attr("y1",y).attr("y2",y)

    svg.selectAll(".v").data(d3.range(1,5)).enter()
      .append("line").classed("v",1)
      .attr("y1",margin).attr("y2",width-margin)
      .attr("x1",x).attr("x2",x)

    //svg.legend().data(distinctInterpretations)
    // .enter()
    // .append("text")
    // .text(function(d) {return;})
    // .style("fill",function(d) { //COLOR pulled in here
    //	return c(d);})

    // then we create the marks, which we put in an initial position
    //with radius Zero - you cannot see Zero. I think that is why some Greek's despised zero.
    //I think it is zen.
    //myData = myData.filter(function(d) { return (+d.numVariant) > 500 ; });
    var totalCircles = 110; //this variable limits the number of circles to display
    svg.selectAll("circle").data(myData.slice(0,totalCircles)) //this is the POWER of D3 select! The relevant data is now part of each circle! Holy Moley!
    //but we are actually cheating a bit here...see the control for what happens when the drop-down is used...
      .enter()
      .append("g")
      .attr("id","circles")
      .attr("transform", function(d) { return "translate("  +x(0)+ "," +y(0)+ ")"; })

      .append("circle")
    //.attr("cx",function(d) {return x(0);}) you will learn something if you uncomment these two lines - everything is relative
    //.attr("cy",function(d) {return y(0);})
      .attr("r",function(d) {return r(0);})
      .attr("value",function(d) {return d.Date;})
      .style("fill",function(d) {
	return c(d.MostFrequentInterpretation);}) //COLOR pulled in here
      .style("opacity",function(d) {return o(+d.numVariant);});

    svg.selectAll("#circles").append("title")
      .attr("font-size","10px") //making the text smaller!
      .text(function(d) {return " Gene: "+d.Gene+", Number of Variants is "+d.numVariant+", Most Frequent Phenotype is "+d.MostFrequentPhenotype+", Most Frequent Interpretation is "+d.MostFrequentInterpretation;});

    defaultStart(); //
    //default view is most current release
    function defaultStart (){
      var key = datesDropDown.slice(-2,-1);//give value here of most recent version
      graphData = myData.filter(function(d) { return d.Date == key ; });//current data to graph, a little trick
      graphData.sort(function(a,b) {return b.numVariant-a.numVariant;});
      //to explain. we have only totalCircles circles. so by filtering by date and sorting by numVariant we will only be displaying the top totalCircles of the date set
      //we take advantage that function(d,i) has the index for #circles from 0 to totalCircles...he he. talk about obfuscation

      //while were at it lets do bubble sizes in relation to the size of the top totalCircles number of variants for the specific date
      var maxVariants = d3.max(graphData.slice(0,100), function(d){return +d.numVariant;});
      var minVariants = d3.min(graphData.slice(0,100), function(d){return +d.numVariant;});
      r=d3.scale.linear().domain([minVariants,maxVariants]).range([2,40]);

      //oh and lets do the y-axis too
      y=d3.scale.linear().domain([1,maxVariants]).range([height-margin,margin]);
      yAxisChange = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(3)
	.tickSize(0);

      svg.select("#y-axis")
	.attr("transform", "translate(" + margin + ",0)")
	.call(yAxisChange);

      //change titles first
      svg.selectAll("#circles").select("title").text(function(d,i) {return " Gene: "+graphData[i].Gene+", Number of Variants is "+graphData[i].numVariant+", Most Frequent Phenotype is "+graphData[i].MostFrequentPhenotype+", Most Frequent Interpretation is "+graphData[i].MostFrequentInterpretation;});

      svg.selectAll("#circles")
	.transition().duration(4500)
	.attr("transform", function(d,i) { return "translate(" + x(+graphData[i].numPhenotypes) + "," + y(+graphData[i].numVariant) + ")"; })//SEE HOLY MOLE above!
	.select("circle")
	.attr("r",function(d,i) { //index of circles matches index of myData array! isn't sorting cool...did I forget to mention that previously?
	  if (graphData[i].Date == key) {
	    //if (d.Date == key) {//but this works too...see holy mole
	    if (myData.length == 1) { //when accessing non-Gene page
	      return 100;
	    }else {
	      return r(+graphData[i].numVariant);//I couldn't help but use this alternate
	    }
	  }
	  else{ return 0;}
	})
	.attr("value",function(d,i) {return graphData[i].Date;})
	.style("fill",function(d,i) {
	  return c(graphData[i].MostFrequentInterpretation);}) //COLOR pulled in here
	.style("opacity",function(d,i) {return o(+graphData[i].numVariant);});


      //we play a little hide and seek.
      svg.selectAll(".geneNameText").style("visibility","hidden");
      svg.selectAll("#circles").append("text")
	.attr("class","geneNameText")
	.attr("dateId",key)
	.attr("dy", ".3em")
	.style("font-size",function(d,i) {return (1.6*(r(+graphData[i].numVariant)/50))+"em";})
	.style("text-anchor", "middle")
	.style("fill","Black")
	.text(function(d,i) { return graphData[i].Gene; })
	.style("visibility",function(d,i) {
	  if (graphData[i].Date == key) {//but this works too...see holy mole
	    if (myData.length == 1) { //when accessing non-Gene page
	      return "show";
	    }else {
	      return "show";//I couldn't help but use this alternate
	    }
	  }
	  else{ return "hidden";}
	});
      //.on("click",function(){d3.select(this).style("opacity",0);});// PLAY WITH THIS LATER
    }//default view function

    //controls what happens when drop-down is used
    d3.select('select')
      .on("change", function() {
	var key = this.value;

	if (key == "Please select a date") {
	  svg.selectAll("#circles")
	    .transition().duration(4500)
	    .attr("transform", function(d,i) { return "translate(" + (-50) + "," + (-50) + ")"; })//SEE HOLY MOLE above!
	    .select("circle")
	    .attr("r",0)
	    .attr("value",0)
	    .style("fill", c(0) ) //COLOR pulled in here
	    .style("opacity",o(0));
	  return 0;
	}

	graphData = myData.filter(function(d) { return d.Date == key ; });//current data to graph, a little trick
	graphData.sort(function(a,b) {return b.numVariant-a.numVariant;});
	//to explain. we have only totalCircles circles. so by filtering by date and sorting by numVariant we will only be displaying the top totalCircles of the date set
	//we take advantage that function(d,i) has the index for #circles from 0 to totalCircles...he he. talk about obfuscation

	//while were at it lets do bubble sizes in relation to the size of the top totalCircles number of variants for the specific date
	var maxVariants = d3.max(graphData.slice(0,100), function(d){return +d.numVariant;});
	var minVariants = d3.min(graphData.slice(0,100), function(d){return +d.numVariant;});
	r=d3.scale.linear().domain([minVariants,maxVariants]).range([2,40]);

	//oh and lets do the y-axis too
	y=d3.scale.linear().domain([1,maxVariants]).range([height-margin,margin]);
	yAxisChange = d3.svg.axis()
	  .scale(y)
	  .orient("left")
	  .ticks(3)
	  .tickSize(0);

	svg.select("#y-axis")
	  .attr("transform", "translate(" + margin + ",0)")
	  .call(yAxisChange);

	//change titles first -- need to check for existance
	svg.selectAll("#circles").select("title").text(function(d,i) {
	  return " Gene: "+graphData[i].Gene+", Number of Variants is "+graphData[i].numVariant+", Most Frequent Phenotype is "+graphData[i].MostFrequentPhenotype+", Most Frequent Interpretation is "+graphData[i].MostFrequentInterpretation;
	});

	svg.selectAll("#circles")
	  .transition().duration(4500)
	  .attr("transform", function(d,i) { return "translate(" + x(+graphData[i].numPhenotypes) + "," + y(+graphData[i].numVariant) + ")"; })//SEE HOLY MOLE above!
	  .select("circle")
	  .attr("r",function(d,i) { //index of circles matches index of myData array! isn't sorting cool...did I forget to mention that previously?
	    if (graphData[i].Date == key) {
	      //if (d.Date == key) {//but this works too...see holy mole
	      if (myData.length == 1) { //when accessing non-Gene page
		return 100;
	      }else {
		return r(+graphData[i].numVariant);//I couldn't help but use this alternate
	      }
	    }
	    else{ return 0;}
	  })
	  .attr("value",function(d,i) {return graphData[i].Date;})
	  .style("fill",function(d,i) {
	    return c(graphData[i].MostFrequentInterpretation);}) //COLOR pulled in here
	  .style("opacity",function(d,i) {return o(+graphData[i].numVariant);});


	//we play a little hide and seek.
	svg.selectAll(".geneNameText").style("visibility","hidden");
	svg.selectAll("#circles").append("text")
	  .attr("class","geneNameText")
	  .attr("dateId",key)
	  .attr("dy", ".3em")
	  .style("font-size",function(d,i) {return (1.6*(r(+graphData[i].numVariant)/50))+"em";})
	  .style("text-anchor", "middle")
	  .style("fill","Black")
	  .text(function(d,i) { return graphData[i].Gene; })
	  .style("visibility",function(d,i) {
	    if (graphData[i].Date == key) {//but this works too...see holy mole
	      if (myData.length == 1) { //when accessing non-Gene page
		return "show";
	      }else {
		return "show";//I couldn't help but use this alternate
	      }
	    }
	    else{ return "hidden";}
	  });
	//.on("click",function(){d3.select(this).style("opacity",0);});// PLAY WITH THIS LATER
      }); //on change function for select

    svg.append("g")
      .append("text")
      .attr("class","axis")
      .style("text-anchor", "middle")
      .text("Color indicates Interpretation")
      .attr("transform","rotate(90)") //changes x to y and y to x
      .attr("x",180)
      .attr("y", parseInt(-0.9 * (width+50)));
  });

});
