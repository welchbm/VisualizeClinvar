//gives browser instruction to run on load and adds it as a procedure so that other scripts will also run
if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            geneBubbleIt();
        };
        window.onload = newonload;
} else {
    window.onload = geneBubbleIt();
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

function geneBubbleIt(){ //hugely important. defines scope of variables 
//http://localhost:8080/quickStats
//d3.tsv("quickStats"+pageName+".tsv", type, function(error, data) {
//d3.select("body").append("text").text("I wrote on your page");

//d3.tsv("http://localhost:8080/geneBubble2.tsv",function(myData) {
d3.tsv("data/geneBubble/geneBubble2.tsv",function(myData) {
	var width = 300,
		height = 250, 
		margin = 50;

	var svg=d3.select("#geneBubbleIc").append("svg").attr("width",width).attr("height",height);

	d3.select("myData").filter(function(d) {if (+d.numVariant > 5) {return d;}});
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
	var r=d3.scale.linear().domain([minVariants,maxVariants]).range([2,100]);
	var o=d3.scale.linear().domain([minVariants,maxVariants]).range([.8,1]);

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
	var c=d3.scale.category20().domain(distinctInterpretations);//names to grab colors
	
  //x and y for placement....hmmm
	var x=d3.scale.linear().domain([1,maxPhenotypes]).range([margin,width-margin]);
	var y=d3.scale.linear().domain([1,maxVariants]).range([height-margin,margin]);

	var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(4);

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(3);

	svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (height - margin) + ")")
	.call(xAxis);

	svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + margin + ",0)")
	.call(yAxis);

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
  svg.selectAll("circle").data(myData) //this is the POWER of D3 select! The relevant data is now part of each circle! Holy Moley!
    .enter() 
	.append("circle")
    .attr("cx",function(d) {return x(0);})
    .attr("cy",function(d) {return y(0);})
    .attr("r",function(d) {return r(0);})
	.attr("value",function(d) {return d.Date;})
    .style("fill",function(d) {
		return c(d.MostFrequentInterpretation);}) //COLOR pulled in here
    .style("opacity",function(d) {return o(+d.numVariant);})
      .append("title")
	  .append("text")
		.attr("font-size","10px") //making the text smaller!
		.text(function(d) {return " Gene: "+d.Gene;})
	  .append("text")
	  	.attr("font-size","10px") //making the text smaller!
		.attr("dy","10px") //and here is where we can put it wherever want! control is good
		.attr("dx","10px")
		.text(function(d) {return ", Number of Variants is "+d.numVariant;})
	  .append("text")
	  	.attr("font-size","10px") //making the text smaller!
		.attr("dy","10px") //and here is where we can put it wherever want! control is good
		.attr("dx","10px")
		.text(function(d) {return ", Most Frequent Phenotype is "+d.MostFrequentPhenotype;})

	  .append("text")
	  	.attr("font-size","10px") //making the text smaller!
		.attr("dy","10px") //and here is where we can put it wherever want! control is good
		.attr("dx","10px")
		.text(function(d) {return ", Most Frequent Interpretation is "+d.MostFrequentInterpretation;})
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
	//d3.select(myData).data(function(d) {return d.date;});
	
	d3.select("#geneBubbleIc").append("select").attr("id","geneBubblesDates").append("option").text("Please select a date");
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
	
	//controls what happens when drop-down is used
	d3.select('select')
      .on("change", function() {
		var key = this.value;
	  // now we initiate - moving the marks to their position
		svg.selectAll("circle").transition().duration(4500)
			.attr("cx",function(d) {return x(+d.numPhenotypes);})//number of phenotypes. SEE HOLY MOLE above!
			.attr("cy",function(d) {return y(+d.numVariant);}) //numVariants
			.attr("r",function(d,i) { //index of circles matches index of myData array! isn't sorting cool...did I forget to mention that previously?
			  //if (myData[i].Date == key) {
			  if (d.Date == key) {//but this works too...see holy mole
				if (myData.length == 1) { //when accessing non-Gene page
					return 100;
				}else {
					return r(+myData[i].numVariant);//I couldn't help but use this alternate
				}
			  }
			  else{ return 0;}
			})
		//.on("click",function(){d3.select(this).style("opacity",0);});// PLAY WITH THIS LATER
	  });	
});

}
