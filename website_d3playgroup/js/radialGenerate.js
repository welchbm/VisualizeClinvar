var div1=d3.select(document.getElementById('radial-div1'));
var div2=d3.select(document.getElementById('radial-div2'));
var div3=d3.select(document.getElementById('radial-div3'));

start();

function onClick1() {
    deselect();
    div1.attr("class","selectedRadial");
}

function onClick2() {
    deselect();
    div2.attr("class","selectedRadial");
}

function onClick3() {
    deselect();
    div3.attr("class","selectedRadial");
}

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


	d3.csv("data/radials/stats.csv", function(error, data){
	data.forEach(function(d){d['PHENOTYPE'] = +d['PHENOTYPE']; 
							 d['DBSNP_DB'] = +d['DBSNP_DB'];
							 d['GENE'] = +d['GENE'];});
							 
							 
							 
    console.log(data);
	console.log(data[0]["Phenotype"]);
		
    var rp1 = radialProgress(document.getElementById('radial-div1'))
            .label("Phenotype")
            .onClick(onClick1)
            .diameter(120)
            .value(data[0]["PHENOTYPE"])
            .render();

    var rp2 = radialProgress(document.getElementById('radial-div2'))
            .label("Gene")
            .onClick(onClick2)
            .diameter(120)
            .value(data[0]["GENE"])
            .render();

    var rp3 = radialProgress(document.getElementById('radial-div3'))
            .label("DBSNP")
            .onClick(onClick3)
            .diameter(120)
            .value(data[0]["DBSNP_DB"])
            .render();

});
}
