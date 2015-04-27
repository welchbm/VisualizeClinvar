//person responsible for this D3 js design: Bret Heale reached at bheale@gmail.com
//comments always welcome
//gives browser instruction to run on load and adds it as a procedure so that other scripts will also run
if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            quickStatic();
        };
        window.onload = newonload;
} else {
    window.onload = quickStatic();
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

function quickStatic(){ //hugely important. defines scope of variables 

//http://localhost:8080/quickStats data/quickStats/
var quick_stats_tsv = ["quickStats", pageName].join('') // this takes care of null pageName
d3.tsv("../tsv/"+quick_stats_tsv+".tsv", type, function(error, data) {
//NOTE gene specific TSV file does not have number of genes, for obvious reasons

	var containerWidth = parseInt(d3.select("#quickStats").style("width"),0);//select and style give us access to the historyGraphic objects width - kinda of useful for sizing the graphic to fit historyGraphic container on html page
	var containerHeight = parseInt(d3.select("#quickStats").style("height"),0);
	
    var color = d3.scale.linear() //scaling and colors for a little
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222","#111","#000"]);

	var i = 0;
	var svg = d3.select("#quickStats").append("svg")
				//.attr("style","border:1px solid black;")
				.attr("xmlns","http://www.w3.org/2000/svg")
	                .attr("width", containerWidth) //hey, I made it fit the container
                .attr("height",(2.1*(data.length)*containerWidth*30/320));//hey, I made it fit the container with a little lazy coding
				
        //background rectangle        
		//	svg.append("g").attr("class","rect")
				//.attr("transform", "translate(" + -margin.left + "," + -margin.top + ")")
		//		.append("rect")
		//		.attr("x",0)
		//		.attr("y",0)
		//		.attr("width", containerWidth)
		//		.attr("height", (10.5*containerWidth*20/320));

		//the content
            svg.append("g")
				.attr("transform","translate("+(-2*(containerWidth*20/320))+","+(-(containerWidth*20/320))+")") //a little lazy coding to start the first line in the upper-left...don't tell anyone ;O)
					.selectAll("text")
						.data(data)
						.enter().append("text")
						.style("font-size", function(d) { return (containerWidth*30/320) + "px";})
				//.style("fill", function(d, i) { return color(i); })
						//from observation I have 48 characters of size '(2/3)*(containerWidth*20/320)' in width to play with for containerWidth of 375
						//about 33 Big font size containerWidth*20/320 in width
						//about 6.5 Big font size containerWidth*20/320 in height
						//about 9 characters of size '(2/3)*(containerWidth*20/320)' in height
						.attr("transform", function(d) {
							i = i +(2*(containerWidth*30/320)); //adjust position for font size
							//d.text.length gives us the length of the string so we can adjust for this length to keep from going to far to the left
							//overhang = d.text.length - 5;//close approximation
							//if (i 
							//return "translate(" + [i, i] + ")";
							return "translate(" + [(2*(containerWidth*30/320)), i] + ")";
						})
						.append("tspan")
						.attr("class","graphicNumber")
							.text(function(d) { //add some commas
									return d.size.toLocaleString();//toLocaleString should be supported, from what I have read, by most browsers. Does not work for decimal numbers. 
								})
							.attr("id","colorme")
						.append("tspan") //tspan allows us to have multiple lines
							.attr("class", "graphicWords")
							//.attr("font-size",(1/2)*(containerWidth*20/320)+"px") //making the text smaller!
							//.attr("dy",(1/2)*(containerWidth*20/320)+"px")	
							//and here is where we can put it wherever want! control is good
							//.attr("dx",-1*(containerWidth*20/320)+"px") //HEREHERE hERE
							.attr("dx",0.5*(containerWidth*30/320)+"px")
							//.attr("dy","10 20 40 10") for fun... 
							.text(function(d) {return d.text;}); //d.text is contains a value from the tsv column called text
							
							d3.select("#colorme").style("fill","#F73A18"); //lazy coding to make first number colored differently. the select stops on the first match!
});



function type(d) { 
  d.size = +d.size; //one way to have numbers seen as numbers
  return d;
}
}
