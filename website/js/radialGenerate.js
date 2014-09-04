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

    var rp1 = radialProgress(document.getElementById('radial-div1'))
            .label("Phenotype")
            .onClick(onClick1)
            .diameter(120)
            .value(90.2)
            .render();

    var rp2 = radialProgress(document.getElementById('radial-div2'))
            .label("Gene")
            .onClick(onClick2)
            .diameter(120)
            .value(85.431)
            .render();

    var rp3 = radialProgress(document.getElementById('radial-div3'))
            .label("DBSNP")
            .onClick(onClick3)
            .diameter(120)
            .value(86.6)
            .render();

}
