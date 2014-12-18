//responsible person Bret bheale@gmail.com 

startRadialsPhenoTermo();

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}





function labelFunction(val,min,max) {

}

function deselect() {
    div1.attr("class","radial");
    div2.attr("class","radial");
    div3.attr("class","radial");
}

function startRadialsPhenoTermo() {
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

  var headers = d3.keys(data[0]); //headers collected
  //now select the ones we want
  function isInPhenoTermoList (element) {
	var dbToCheck = ['SNOMED_CODE',"MESH_CODE","HPO_CODE","ICD9_CODE"];
	for( i = 0; i < dbToCheck.length; i++) {
	
		if (element == dbToCheck[i]) {
			return true;
		}
	}
	return false;
  }
  headers = headers.filter(isInPhenoTermoList);		//gets column headers and choose which to show


  var diameterRadial = 80;

 d3.select("#RadialsPhenoTermoIC").append("div").style("overflow","scroll").style("height","440px").style("width","440px").attr("class","RadialsInner");
  for (var i = 0; i < headers.length; i++) { //iterates
  
	data[0][headers[i]] = +data[0][headers[i]];

	if (!(isNaN(data[0][headers[i]]) )){
		d3.select("#RadialsPhenoTermoIC").select(".RadialsInner").append("div").style("margin","10px").style("display","block").style("float","left").attr("id","radialPhenoTermo-div"+headers[i]).call(drag).call(zoom); //make target div
		var rp1 = radialProgress(document.getElementById("radialPhenoTermo-div"+headers[i])) //radial baby
            .label(headers[i])
            //.onClick(onClick1)
            .diameter(diameterRadial)
            .value(data[0][headers[i]])
            .render();
	}
  }
});
}
							 
							
