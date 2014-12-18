//responsible person Bret bheale@gmail.com

startRadialsGeneDBInfo();

function labelFunction(val,min,max) {

}

function deselect() {
    div1.attr("class","radial");
    div2.attr("class","radial");
    div3.attr("class","radial");
}


function startRadialsGeneDBInfo() {

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
  //now select the ones we want
  function isInGeneDBinfoList (element) {
	var dbToCheck = [
		"MEDGEN_CODE",
		"DBSNP_DB",
		"GENE",
		"OMIM_CODE",
		"GENALLIANCE_CODE",
		"GENEREV_CODE",
		"ORPHNET_CODE",
		"DBVAR_DB",
		"ORD_CODE",
		"OMIM_DB",
		"GENEREV_DB",
		"UNISWISSPROT_DB",
		"GENE_CODE",
		"UNISWISSPROT_CODE",
		"DBRBC_DB",
		"NCBI_DB",
		"GENE_DB",
		"GHR_CODE"
	];
	for( i = 0; i < dbToCheck.length; i++) {
	
		if (element == dbToCheck[i]) {
			return true;
		}
	}
	return false;
  }
  headers = headers.filter(isInGeneDBinfoList);		//gets column headers and choose which to show
  var diameterRadial = 80;

 d3.select("#RadialsGeneDBinfoIC").append("div").style("overflow","scroll").style("height","440px").style("width","440px").attr("class","RadialsInner");
  for (var i = 0; i < headers.length; i++) { //iterates
  
	data[0][headers[i]] = +data[0][headers[i]];
	if (!(isNaN(data[0][headers[i]]) )){
		d3.select("#RadialsGeneDBinfoIC").select(".RadialsInner").append("div").style("float","left").attr("id","radialGeneDBInfo-div"+headers[i]).call(drag).call(zoom); //make target div
		var rp1 = radialProgress(document.getElementById("radialGeneDBInfo-div"+headers[i])) //radial baby
            .label(headers[i])
            //.onClick(onClick1)
            .diameter(diameterRadial)
            .value(data[0][headers[i]])
            .render();
	}
  }

});
}
							 
