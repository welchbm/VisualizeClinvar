//person responsible for this D3 js design: Bret Heale reached at bheale@gmail.com
//comments always welcome
//gives browser instruction to run on load and adds it as a procedure so that other scripts will also run
if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            chromoCountRaceIt();
        };
        window.onload = newonload;
} else {
    window.onload = chromoCountRaceIt();
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

function chromoCountRaceIt(){ //hugely important. defines scope of variables

//load up the chromosome length details
//using external tsv so that it can be updated if new length consensus's are reached
var chromoLengths = {};
 //d3.tsv("http://localhost:8080/ChromsomeLengths.txt",function(error,lengthData) {
d3.tsv("data/chromoCount/ChromsomeLengths.txt",function(error,lengthData) {
  lengthData.forEach(function(d) {
    d.numNT = +d.numNT;
    d.numGene = +d.numGene;
	if (d.CHR == "non-specified")
		{d.numNT=0;}
  });
  //re-order by chromosome size
	lengthData.sort(function(a,b) {return b.numNT-a.numNT;});

  lengthData.forEach(function(d) { //added because sort will behave differently in chrome vs IE
	//due to the undefined value for numNT for "non-specified". Another reason to always check that a value exists!
    d.numNT = +d.numNT;
    d.numGene = +d.numGene;
	if (d.CHR == "non-specified")
		{d.numNT="Not applicable";}
  });
	//key-value pairs for access
	//commented out is for creating an object
	//var key = "";
	//lengthData.forEach(function(d) {
	//	key = d.CHR;
	//	chromoLengths[key] = {"numNT":d.numNT,"numGene":d.numGene};
	//});
	chromoLengths = lengthData;
	//console.log(lengthData);
	//console.log(chromoLengths);
	runChromoRace();
});

function runChromoRace (){
d3.tsv("data/chromoCount/ChromosomeCounts.tsv",function(myData) {
  //CHR	MostFrequentPhenotype	numVariant	numPhenotypes	Date
  //non-specified	not provided	77	23	aug2014
  //20	Lung cancer	2029	176	aug2014

  //d3.tsv("http://localhost:8080/ChromosomeCounts.tsv",function(myData) {
  var svgWidth = parseInt(d3.select("#chromoRaceIC").style("width"),0);
  var width = parseInt(svgWidth * 1.1);
  var height = parseInt(svgWidth * 1.15);
  var margin = 50;

  var svg=d3.select("#chromoRaceIC").append("svg").attr("width",width).attr("height",height).attr("viewBox","0 0 "+width+" "+height);

  var chromoPics = { '1':{"file":'data/chromoCount/chr1.jpg',"ratioHtoW":1.752941176,"relWidth":1},
                     '2':{"file":'data/chromoCount/chr2.jpg',"ratioHtoW":1.648648649,"relWidth":0.870588235},
                     '3':{"file":'data/chromoCount/chr3.jpg',"ratioHtoW":1.087719298,"relWidth":1.341176471},
                     '4':{"file":'data/chromoCount/chr4.jpg',"ratioHtoW":1.329113924,"relWidth":0.929411765},
                     '5':{"file":'data/chromoCount/chr5.jpg',"ratioHtoW":1.564102564,"relWidth":0.917647059},
                     '6':{"file":'data/chromoCount/chr6.jpg',"ratioHtoW":1.5,"relWidth":0.823529412},
                     '7':{"file":'data/chromoCount/chr7.jpg',"ratioHtoW":2.1875,"relWidth":0.564705882},
                     '8':{"file":'data/chromoCount/chr8.jpg',"ratioHtoW":1.2,"relWidth":0.882352941},
                     '9':{"file":'data/chromoCount/chr9.jpg',"ratioHtoW":1.177419355,"relWidth":0.729411765},
                     '10':{"file":'data/chromoCount/chr10.jpg',"ratioHtoW":1.847826087,"relWidth":0.541176471},
                     '11':{"file":'data/chromoCount/chr11.jpg',"ratioHtoW":1.603448276,"relWidth":0.682352941},
                     '12':{"file":'data/chromoCount/chr12.jpg',"ratioHtoW":1.294117647,"relWidth":0.8},
                     '13':{"file":'data/chromoCount/chr13.jpg',"ratioHtoW":0.802631579,"relWidth":0.894117647},
                     '14':{"file":'data/chromoCount/chr14.jpg',"ratioHtoW":1,"relWidth":0.835294118},
                     '15':{"file":'data/chromoCount/chr15.jpg',"ratioHtoW":1.675675676,"relWidth":0.435294118},
                     '16':{"file":'data/chromoCount/chr16.jpg',"ratioHtoW":1.355555556,"relWidth":0.529411765},
                     '17':{"file":'data/chromoCount/chr17.jpg',"ratioHtoW":0.868852459,"relWidth":0.717647059},
                     '18':{"file":'data/chromoCount/chr18.jpg',"ratioHtoW":1.365853659,"relWidth":0.482352941},
                     '19':{"file":'data/chromoCount/chr19.jpg',"ratioHtoW":1.261904762,"relWidth":0.494117647},
                     '20':{"file":'data/chromoCount/chr20.jpg',"ratioHtoW":0.909090909,"relWidth":0.517647059},
                     '21':{"file":'data/chromoCount/chr21.jpg',"ratioHtoW":1.204545455,"relWidth":0.517647059},
                     '22':{"file":'data/chromoCount/chr22.jpg',"ratioHtoW":0.978723404,"relWidth":0.552941176},
                     'X':{"file":'data/chromoCount/chrX.jpg',"ratioHtoW":2.566666667,"relWidth":0.352941176},
                     'Y':{"file":'data/chromoCount/chrY.jpg',"ratioHtoW":2.176470588,"relWidth":0.2},
                     'MT':{"file":'data/chromoCount/MT.jpg',"ratioHtoW":2.162162162,"relWidth":0.435294118},
                     'non-specified':{"file":'',"ratioHtoW":0.5,"relWidth":2} }

//console.log(chromoPics);
//CHR	numNT	numGene
//1	248,956,422	3000
//2	242,193,529	2500
//3	198,295,559	1900
//4	190,214,555	1600
//5	181,538,259	1700
//6	170,805,979	1900

//7	159,345,973	1800
//X	156,040,895	1400
//8	145,138,636	1400
//9	138,394,717	1400
//11	135,086,622	2000
//10	133,797,422	1400
//12	133,275,309	1600

//13	114,364,328	800
//14	107,043,718	1200
//15	101,991,189	1200
//16	90,338,345	1300
//17	83,257,441	1600
//18	80,373,285	600

//20	64,444,167	900
//19	58,617,616	1700
//Y	57,227,415	200
//22	50,818,468	800
//21	46,709,983	400
//MT	16,569	13
//non-specified	undefined

//get scaling
	var maxVariants = d3.max(myData, function(d){return +d.numVariant;});
	var minVariants = d3.min(myData, function(d){return +d.numVariant;});
	var scaleNumVariantW=d3.scale.linear().domain([minVariants,maxVariants]).range([0,(svgWidth - margin)]);
		//.range([0,1]); this range was for opacity

//this is the y position of the layout
//using chromosome lengths - recall we've ordered lengthData by NT length of chromosomes
var x = 0;//gives a left margin of 10px
var y = -10;
var textSize = (svgWidth*20/320);
var chrWidth = 0;
var chrHeight = 0;
var key = "";
chromoLengths.forEach(function(d) {
	key = d.CHR;
		chromoPics[key].dx = x;
		chromoPics[key].dy = y;
		chromoPics[key].numNT = d.numNT;
		chromoPics[key].numGene = d.numGene;
		x = 0;
	//chromoPics[key] = {"numNT":d.numNT,"numGene":d.numGene};
	//if (key != "non-specified"){
	//	if (key == "7" || key == "13" || key == "19") {
			y = y +(svgWidth/25);                //control here
	//		x = 10; //margin of 10px
	//	}
		myData.forEach(function(d2) {
			if(d2.CHR == key ) {
				x = x + scaleNumVariantW(d2.numVariant);
					//(svgWidth/11);
			}
		});
		chromoPics[key].dx = x;
		chromoPics[key].dy = y;
		x = 0;
	//}
});


//	myData has :CHR,MostFrequentPhenotype,numVariant,numPhenotypes,Date
//			CHR gives us key for chromoPics
//	LAYOUT
//	chr 1 0,0
//		width:(scaledNumberVariantW(d.numVariant))
//		height: (scaledNumberVariantW(d.numVariant)) * d.ratioHtoW
//		put label at x position is middle of chr: chr1.Xpos + (chr1widht/2)
//					y is chr1.Ypos + chr1height
//	chr 2 +(svgWidth/11),0
//	chr 3 +(svgWidth/11),0
//	to chr 5
//	chr 6 0,+(svgWidth/4)
//	to chr 12
//	chr 13 0,+(svgWidth/4)
//	to chr 18
//	chr 19 0,+(svgWidth/4)
//	chr 20 +(svgWidth/11),same as 19
//	chr 21 +(svgWidth/11),same as 19
//	chr 22 +(svgWidth/11),same as 19
//	X		+(svgWidth/11),same as 19
//	Y		+(svgWidth/11),same as 19
//	MT		+(svgWidth/11),same as 19

var textSize = (svgWidth*20/320)/1.2;

chrWidth = function(d) {return ((svgWidth/11)*chromoPics[d.CHR].relWidth)/1.2;}; //change svgWidth/11 to use scale based on variant information and MAKE IT A FUNCTION
chrHeight = function(d) {return (chrWidth(d)*chromoPics[d.CHR].ratioHtoW)/1.2;}; //make it a function

//svg.append("svg:text").text("Transparency indicates number of variants").attr("x",0).attr("y",textSize*0.75).attr("font-size",textSize*0.75);

svg.selectAll(".chromoPic").data(myData).enter().append("svg:image").attr("x",0).attr("y",0).attr("id",function(d){return "chr"+d.CHR;}).attr("xlink:href",function(d){return chromoPics[d.CHR].file;}).attr("class","chromoPic").transition().duration(1000).attr("width",function(d){return chrWidth(d);}).attr("height", function(d){return chrHeight(d);}).attr("transform", function(d){return "translate(" + chromoPics[d.CHR].dx + ","+chromoPics[d.CHR].dy+")";});

//.attr("opacity",function(d) {return scaleNumVariantW(d.numVariant);}).style("border","1px solid black");
//.attr("width",function(d){return chrWidth(d);}).attr("height", function(d){return chrHeight(d);})

//CHR	MostFrequentPhenotype	numVariant	numPhenotypes	Date
svg.selectAll(".chromoPic").append("title")
		.attr("font-size",textSize) //making the text smaller!
		.text(function(d) {return "Chr: "+d.CHR+", Number of Variants: "+d.numVariant+", Number of Phenotypes is "+d.numPhenotypes+", Most Frequent Phenotype is "+d.MostFrequentPhenotype+", Number of Genes is "+chromoPics[d.CHR].numGene +", Approx. Number of Nucleotides is "+chromoPics[d.CHR].numNT;});

//labels
svg.selectAll(".chromoTxt").data(myData).enter().append("g").append("svg:text").text(function(d){return d.CHR;}).attr("font-size",textSize).transition().duration(1000).attr("transform", function(d){return "translate(" +(chromoPics[d.CHR].dx + (textSize*1.5)) + ","+(chromoPics[d.CHR].dy + textSize)+")";}).attr("fill","black");
//(chromoPics[d.CHR].dx + (chrWidth(d)/5)) + ","+(textSize+(chromoPics[d.CHR].dy)+(svgWidth/11)*chromoPics[d.CHR].relWidth*chromoPics[d.CHR].ratioHtoW)
//title on label
svg.selectAll("g").append("title")
		.attr("font-size",textSize) //making the text smaller!
		.text(function(d) {return "Chr: "+d.CHR+", Number of Variants: "+d.numVariant+", Number of Phenotypes is "+d.numPhenotypes+", Most Frequent Phenotype is "+d.MostFrequentPhenotype+", Number of Genes is "+chromoPics[d.CHR].numGene +", Approx. Number of Nucleotides is "+chromoPics[d.CHR].numNT;});

//diagonal line
svg.append("path").attr('d','M 0 '+(height-10)+' L '+svgWidth+' 0').attr("stroke","grey").attr("stroke-width","1.25").attr("fill","none").attr("stroke-dasharray","5,5");

//text at bottom
svg.append("svg:text").text("Increasing number of Variants").attr("x",20).attr("y",height-10).attr("font-size",textSize*0.75);
//line with
svg.append("path").attr('d','M '+(14*textSize*0.75)+' '+(height-(textSize*0.75/2.5)-10)+' L '+(svgWidth -50)+' '+(height-(textSize*0.75/2.5)-10)+'').attr("stroke","grey").attr("stroke-width","1.25").attr("fill","none").attr("stroke-dasharray","7,5");
//arrowhead
svg.append("path").attr('d',' M '+(svgWidth -60)+' '+(height-(textSize*0.75/2.5)-20)+' L '+(svgWidth -50)+' '+(height-(textSize*0.75/2.5)-10)+' L '+(svgWidth -60)+' '+(height-(textSize*0.75/2.5))+'').attr("stroke","grey").attr("stroke-width","1.25").attr("fill","none").attr("stroke-dasharray","7,5");

}); //d3.tsv
} //runChromoRace
}
