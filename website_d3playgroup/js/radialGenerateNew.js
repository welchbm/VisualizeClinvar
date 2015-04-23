//var div1=d3.select(document.getElementById('radial-div1'));
//var div2=d3.select(document.getElementById('radial-div2'));
//var div3=d3.select(document.getElementById('radial-div3'));

start();

//function onClick1() {
 //   deselect();
  //  div1.attr("class","selectedRadial");
//}

//function onClick2() {
//    deselect();
//    div2.attr("class","selectedRadial");
//}

//function onClick3() {
 //   deselect();
//    div3.attr("class","selectedRadial");
//}

function labelFunction(val,min,max) {

}

function deselect() {
    div1.attr("class","radial");
    div2.attr("class","radial");
    div3.attr("class","radial");
}


function start() {
//var dataset = d3.csv("file.csv", function(data){
  //data.forEach(function(d){ d['columnName'] = +d['columnName']; });   
  //console.log(data);     
//});


	//d3.csv("data/radials/stats.csv", function(error, data){
//	data.forEach(function(d){d['PHENOTYPE'] = +d['PHENOTYPE']; 
//							 d['DBSNP_DB'] = +d['DBSNP_DB'];
//							 d['GENE'] = +d['GENE'];});

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);


function zoomed() {
    d3.select(this).attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}

d3.csv('data/radials/stats.csv', function(error, data) {

  var headers = d3.keys(data[0]); //gets column headers can alternatively choose which to show
	//headers
  var diameterRadial = 80;

 d3.select("#Radials").append("div").style("overflow","scroll").style("height","440px").style("width","440px").attr("id","RadialsInner");
  for (var i = 0; i < headers.length; i++) { //iterates
  
	data[0][headers[i]] = +data[0][headers[i]];
	if (!(isNaN(data[0][headers[i]]) )){
		d3.select("#RadialsInner").append("div").style("float","left").attr("id","radial-div"+headers[i]).call(drag).call(zoom); //make target div
		var rp1 = radialProgress(document.getElementById("radial-div"+headers[i])) //radial baby
            .label(headers[i])
            //.onClick(onClick1)
            .diameter(diameterRadial)
            .value(data[0][headers[i]])
            .render();
	}
  }

});
}
							 
							 
							 
 //   console.log(data);
//	console.log(data[0]["Phenotype"]);
		
//    var rp1 = radialProgress(document.getElementById('radial-div1'))
  //          .label("Phenotype")
    //        .onClick(onClick1)
      //      .diameter(120)
       //     .value(data[0]["PHENOTYPE"])
        //    .render();

 //   var rp2 = radialProgress(document.getElementById('radial-div2'))
  //          .label("Gene")
   //         .onClick(onClick2)
    //        .diameter(120)
     //       .value(data[0]["GENE"])
      //      .render();

    //var rp3 = radialProgress(document.getElementById('radial-div3'))
     //       .label("DBSNP")
      //      .onClick(onClick3)
       //     .diameter(120)
        //    .value(data[0]["DBSNP_DB"])
        //    .render();

//});
//}
