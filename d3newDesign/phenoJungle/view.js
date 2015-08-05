//person responsible for this D3 js design: Bret Heale reached at bheale@gmail.com
//comments always welcome
//gives browser instruction to run on load and adds it as a procedure so that other scripts will also run
$(function phenoJungle(){ //hugely important. defines scope of variables
  var containerWidth = parseInt(d3.select(".graph.phenoJungle").style("width"),0);//select and style give us access to the

  //talk about control. Here we modify the dom target object
  if (containerWidth < 800) { //this works for the transition from small to large on Seth's webdesign as of 04262015 beacuse we
    //get the size of the div before we change it to the minimum
    d3.select(".graph.phenoJungle").style("width","800px").style("height","420px").style("overflow","hidden");
  } 

  /////////////////////////////////////////////
  //Goal: focus is on the number of variants from a phenotype mapped to a code system
  //phenotype circles have num varaint as number inside when circle above specific radius size
  //	title has details - name of phenotype
  //code circles need to keep code system name but remove "_code"
  //need lable: Phenotypes, Code Systems
  //Graph title: Mapping Phenotypes to Code systems
  //
  ////////////////////////////
  var margin = {top: 20, right: 120, bottom: 20, left: 120},
      width = 1000 - margin.right - margin.left,
      height = 900 - margin.top - margin.bottom;

  var svg = d3.select(".graph.phenoJungle").append("svg")
      .attr("viewBox","0 0 "+(width + margin.right + margin.left)+" "+(height + margin.top + margin.bottom))
      .style("width","auto")
  //.style("height",height)
      .style("overflow","visible")
      .attr("preserveAspectRatio","xMidYMin slice")
  //.style("overflow","hidden")
      .append("g");
  //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // svg.append("rect").attr("width", 900)
  //.attr("height", 550).style("fill","#DAE9F2");

  var startX = 100;
  var codeSystemY =  350;
  var phenoY =  220;
  var PhenoOffset= 78; //space between phenotype circles centres
  var CodeOffset = 50; //space between code-system circles centres
  var currentColumn = 0;

  //function henoTocodeSystemPaths (){
  //d3.tsv("http://127.0.0.1/phenoJungle.tsv",function(myData) {
  d3.tsv(gon.tsv_paths['phenoJungle'],function(myData) {


    //Phenotype;numVariants;BATCHDATE;RCV;CLINVARSET_ID;DATE_CREATED;DATE_LAST_UPDATED;OMIM_CODE;MEDGEN_CODE;GENALLIANCE_CODE;SNOMED_CODE;GENEREV_CODE;ORPHNET_CODE;ORD_CODE;MESH_CODE;HPO_CODE;GHR_CODE;GENETEST_CODE;GENE_CODE;UNISWISSPROT_CODE;EFO_CODE;ICD9_CODE;GENE;DBSNP_DB;DBVAR_DB;OMIM_DB;GENEREV_DB;UNISWISSPROT_DB;DBRBC_DB;NCBI_DB;GENE_DB;VAR_TYPE;INTERPRETATION;STAR_NUM;HGVS_CODING;HGVS_GENOMIC;HGVS_PROTEIN;ASSEMBLY;CHR;ACCESSION;START_SEQ;STOP_SEQ;
    //Phenotype is the phenotype as a string, the others are the number of variants. numVariants is the number of the varaints with the phenotype
    // array [ {accession: = "", assembly: = "",...},{...]

    var phenoTypeTotals = {};
    var codeSystems = {"OMIM_CODE":0,"MEDGEN_CODE":0,"GENALLIANCE_CODE":0,"SNOMED_CODE":0,"GENEREV_CODE":0,"ORPHNET_CODE":0,"ORD_CODE":0,"MESH_CODE":0,"HPO_CODE":0,"GHR_CODE":0,"GENETEST_CODE":0,"GENE_CODE":0,"UNISWISSPROT_CODE":0,"EFO_CODE":0,"ICD9_CODE":0}; //each codeSystem name to be used in order with totals
    //add totals
    for( i in myData){ //iterates through rows from tsv
      for( j in myData[i]){
	if (!(isNaN(codeSystems[j]))){ //key is a code system
	  var valueToAdd = +myData[i][j];
	  codeSystems[j] = codeSystems[j] + valueToAdd;
	}
      }
      phenoTypeTotals[myData[i]["Phenotype"]] = myData[i]["numVariants"];
    }
    //console.log("phen",phenoTypeTotals);
    //console.log("system"); console.log(codeSystems);
    //when hovered over path shows number of variants in path
    //codesystem circles change size based on number of variants for path attached phenotype
    //hover or click on phenotype circle highlights all the phenotypes paths and changes all code system circle sizes
    //??? re-order based on number???
    //for code system - highlight connected paths and change phenotype circle size to
    //or do circles as bowls with liquid and change amount of liquid....?
    //blue fill...based on percent...

    //get scaling for phenotype circles
    var maxVariants = d3.max(myData, function(d){return +d.numVariants;});
    var minVariants = d3.min(myData, function(d){return +d.numVariants;});
    var svgWidth = 500;
    var margin = 10;
    var scalePhenotypeCircle=d3.scale.linear().domain([minVariants,maxVariants]).range([3,(25)]);
    //console.log(scalePhenotypeCircle(52));
    //scaling codesystems
    var maxVariantsCodes = max(codeSystems,0);
    function max(harray,value) {
      for( d in harray){
	if(value < harray[d]) {
	  value = harray[d];
	}
	//console.log(value+" "+harray[d]);
      }
      return value;
    }
    var minVariantsCodes = min(codeSystems,maxVariantsCodes);
    function min(harray,value) {
      for( d in harray){
	if(value > harray[d]) {
	  value = harray[d];
	}
	//console.log(value+" "+harray[d]);
      }
      return value;
    }
    var scaleCodeSystemCircle=d3.scale.linear().domain([minVariantsCodes,maxVariantsCodes]).range([3,25]);
    //console.log(scaleCodeSystemCircle(52));

    //phenoRank has rank of each phenotype based on number of variants as key value pairs
    var phenoRank = new Object;
    //sort myData1 based on numVariants
    myData.sort(function(a, b) { return (+b["numVariants"]) - (+a["numVariants"]);});
    //iterate over sorted array
    for( i in myData){ //iterates through rows from tsv
      phenoRank[myData[i]["Phenotype"]] = i;
    }
    //console.log(phenoRank);

    //codeSystemRank as key value pairs
    var codeSystemRank = new Object;
    //with d3 we get an easy to use array of objects that is sorted!
    var codeSystemsArry = d3.entries(codeSystems).sort(function(a,b) {return d3.descending(+a.value, +b.value);});
    for(i in codeSystemsArry){
      codeSystemRank[codeSystemsArry[i].key] = i;
    }
    //console.log("smith", codeSystemRank);


    //Phenotype is the phenotype as a string, the others are the number of variants. numVariants is the number of the variants with the phenotype
    // array [ {accession: "", assembly: "",...,Phenotype: ""...,codesytem:""...},{...]
    //each of these is several phenotype to codeSystem paths
    var g1 = svg.append('g').attr("class","notUsedYet1");
    var g2 = svg.append('g').attr("class","notUsedYet2");
    var g3 = svg.append('g').attr("class","legend");
    var g4 = svg.append('g').attr("class","graphTitle");
    var g5 = svg.append('g').attr("class","connectorSet");
    var g6 = svg.append('g').attr("class","circleSet");

    svg.select("RedrawPhenoCodeSystemPaths").on("click", defaultOverview());

    //legend
    g3.append("text")
      .attr("class","GraphTitle graphicNumber")
      .attr("dy", "220")
      .attr("dx", "0")
      .style("font-size",1+"em")
    //.style("fill","#142E40")
      .text("Diseases");//"Phenotypes");

    g3.append("text")
      .attr("class","GraphTitle graphicNumber")
      .attr("dy", "350")
      .attr("dx", "0")
      .style("font-size",1+"em")
    //.style("fill","#142E40")
      .text("Code");
    g3.append("text")
      .attr("class","GraphTitle graphicNumber")
      .attr("dy", "370")
      .attr("dx", "0")
      .style("font-size",1+"em")
    //.style("fill","#142E40")
      .text("Systems");

    if (containerWidth > 500) {	//don't display unless in larger div

      g3.append('g').attr("class","legandCIrcle")
	.append("circle")
      //.attr("transform", "translate(20,65)")
	.attr("transform", "translate(20,520)")
	.attr("r", 20)
	.attr({stroke: '#F73A18', fill: '#B5DBF2', width: '2px'});
      g6.selectAll(".CodecircleNameText")
	.append("text")
	.attr("dy", ".3em")
	.style("font-size",function() {return 0.8+"em";})
	.style("text-anchor", "middle")
      //.style("fill","#142E40")
	.style("fill","#999999")
      //.attr("transform", "translate(20,65)")
	.attr("transform", "translate(20,520)")
	.text("number");
      g3.append("text")
	.attr("dy", "1em")
      //.attr("transform", "translate(50,55)")
	.attr("transform", "translate(50,510)")
	.style("font-size",0.8+"em")
	.style("fill","#999999")
	.text("number and size indicate frequency of annotation");

      g3.append('g').attr("class","legandCIrcleNotUsed")
	.append("circle")
      //.attr("transform", "translate(20,110)")
	.attr("transform", "translate(350,520)")
	.attr("r", 20)
	.attr({stroke: '#F73A18', fill: '#B5DBF2', width: '2px'});
      g3.select(".legandCIrcleNotUsed")
	.append("line")
	.style("stroke",'#F73A18')
      //.attr("x1",function() { return (20 + 20);})
      //.attr("y1",function() { return (110 - 20);})
      //.attr("x2",function() { return (20 - 20);})
      //.attr("y2",function() { return (110 + 20);})
	.attr("x1",function() { return (350 + 20);})
	.attr("y1",function() { return (520 - 20);})
	.attr("x2",function() { return (350 - 20);})
	.attr("y2",function() { return (520 + 20);})
      ;
      g3.append("text")
	.attr("dy", "1em")
      //.attr("transform", "translate(50,100)")
	.attr("transform", "translate(380,510)")
	.style("font-size",0.8+"em")
	.style("fill","#999999")
	.text("No mapping among visible code systems and phenotypes");
      //graph title
      //g4.append("text")
      //		.attr("class","GraphTitle")
      //		.attr("dy", "1em")
      //		.style("font-size",1+"em")
      //		.style("fill","#142E40")
      //		.text("TITLE: Mapping of Top Ten most Frequently used Phenotypes to Common Code Systems");

      g4.append("text")
	.attr("class","GraphTitle")
	.attr("dy", "2.5em")
	.style("font-size",1+"em")
	.style("fill","#142E40")
	.text("GENE SYMBOL: HBB");
    } //end show only when in larger mode



    //svg.append("input")
    //		.attr("id","RedrawPhenoCodeSystemPaths")
    //		.attr("type","button")
    //		.attr("value","Click to redraw")
    //		.on("click",function() {
    //			defaultOverview();
    //		})
    //		.style("color","red")
    //		.style("font-size","20px")
    //		.style("font-weight","bold");



    //data1 contains the occurrence data for the keys in data2.
    //Each element in data1 has a something with the number of co-occurrences of the something with each item in data2
    //data2 is a collection of keys with total occurrence across all some-things
    function createPathDataArry (data1,data2) {
      //easiest at the moment to have x,y coordinates calculated here.
      var pathDataArray = [""];//for return
      var arryPos = 0;
      //data1 is source (start)
      //data2 is target (end)

      //assign numVariants, Phenotype and CodeSystems to paths
      //also provide locations for start and end!
      for( i in data1){ //iterates through rows from tsv
	//pathDataArry[i][data1[i].Phenotype] =data1[i].numVariants; //number of variants that this phenotype represents
	//myData has  {Phenotype:phenotype, numvariants:23...OMIM_CODE:#;medgen_code:#...} do we just copy this data OR keep this as an array to access
	// !! Here we are going to make an array of paths with this construct: {"Phenotype":"","CodeSystem":"","numVariants":,source: { x: 100, y: 50}, target: {x: 100, y: 200}} for example {"Phenotype":"mush","CodeSystem":"spam","numVariants":23,source: { x: 100, y: 50}, target: {x: 100, y: 200}}

	for( j in data1[i]){ //iterates through key-value pairs of the row
	  if ( (+(phenoRank[data1[i]["Phenotype"]]) < 10) && ((j in data2)  && (+data1[i][j])) ){
	    //if key is in the codeSystems to use and the number of variants is greater than 0 AND
	    //the phenotype is in the TOP TEN PHENOTYPES then create a path
	    pathDataArray[arryPos] = {"Phenotype":data1[i]["Phenotype"]};
	    //pathDataArray[arryPos]["Phenotype"] = data1[i]["Phenotype"];
	    pathDataArray[arryPos]["CodeSystem"] = j;
	    pathDataArray[arryPos]["numVariants"] = data1[i][j];

	    //have mydata array in order by size use array index multiplied by offset...happens to be data1
	    pathDataArray[arryPos]["source"] = {x: startX + phenoRank[data1[i]["Phenotype"]]*PhenoOffset ,y: phenoY }; //x position based on Rank, Y positions is a global parameter
            //PROBLEMS some Phenotypes ARE DP NOT USE TARGET CODE GROUPS!!
            //NOT A PROBLEM JUST DON'T HAVE ANY PATHS!!!
            //BE SURE TO INDICATE THOSE WITHOUT PATHS TO THE 14
	    //have codesystme array in order by size use array index multiplied by offset...happens to be data2
	    pathDataArray[arryPos]["target"] = {x: startX + codeSystemRank[j]*CodeOffset ,y: codeSystemY };//x position based on Rank, Y positions is global parameter
            //PROBLEMS some codesystems ARE NOT USEd by phenotypes!!
            //NOT A PROBLEM JUST DON'T HAVE ANY PATHS!!!
            //BE SURE TO INDICATE THOSE WITHOUT PATHS
            //I suggest diagonal line
	    //x: startX + PhenoOffset, y: phenoY - (1.5*10+(startX + PhenoOffset)/50)}, {x: startX + currentColumn*50, y: codeSystemY +(1.5*10+(startX + PhenoOffset)/50)}
	    arryPos++;
	    //console.log(pathDataArray);

	  }
	}
      }
      //console.log(pathDataArray);
      //console.log("system", codeSystems);
      return pathDataArray;
    }

    var diagonally = d3.svg.diagonal();
    //.source(function(xPheno,yPosition){return {"x":xPheno,"y":yPosition};}).target(function(xCodeSystem,yPosition,yOffset){return {"x":xCodeSystem,"y":(yPosition+yOffset)};});

    function defaultOverview() { //MAIN MOST IMPORTANT FUNCTION START HERE!


      var listPhenoDone = {};
      var listCodesDone = {};

      var attatchToSVG = 0;

      g5.selectAll('path')
	.data(createPathDataArry(myData,codeSystems)) // [{"Phenotype":"","CodeSystem":"","numVariants":#,source: { x: #a, y: 50}, target: {x: #c, y: 200}},{"Phenotype":"","CodeSystem":"","numVariants":#,source: { x: #b, y: 50}, target: {x: #d, y: 200}}...]
	.enter()
	.append('g').attr('class','phenoTocodeSystemPaths')
      //.append("g")
      //.attr("id","paths")
	.append('path')
	.style("visibility", function (d,i) { //d is the current path

	  if( !(d.Phenotype in listPhenoDone)){ //circle's drawn once
	    //radius is dependent on total size
	    //position information comes from pathArray
	    drawCircle(d,attatchToSVG, "Pheno");//} //draw phenotype circle once
	    //d.["source"] is {x: startX + phenoRank[data1[i]["Phenotype"]]*PhenoOffset ,y: phenoY }

	    var currentPhenoCircle = {"Phenotype":d.Phenotype, "numVariants":phenoTypeTotals[d.Phenotype],"x":d["source"]["x"], "y":d["source"]["y"],"radius":(scalePhenotypeCircle(phenoTypeTotals[d.Phenotype]))};

	    g6.append('g').attr("class","PhenoCircle").attr("pheno",d.Phenotype)
	    //.select('#PhenoCircle')
	      .data([currentPhenoCircle])
	    //.enter()
	      .append("circle")
	      .attr("transform", function(d) {
		//console.log(d);
		return "translate(" + (d["x"] ) + "," + d["y"] + ")"; })
	      .attr("r", function(d) {
		var radius = 0;
		radius = d.radius;
		return radius; })
	      .attr({stroke: '#F73A18', fill: '#B5DBF2', width: '2px'});

	    //now draw label
	    g6.append('g').attr("class","PhenocircleNameText graphicWords").attr("pheno",d.Phenotype)
	      .data([currentPhenoCircle])
	      .append("text")
	      .attr("dy", ".3em")
	      .style("font-size",function(d,i) {return 0.8+"em";})
	      .style("text-anchor", "middle")
	    //.style("fill","Black")
	      .attr("transform", function(d) {
		//console.log(d);
		//radius larger than 11
		if ( d.radius > 11 ) {return "translate(" + (d["x"] ) + "," + d["y"] + ")";}
		else {return "translate(" + (d["x"] ) + "," + (d["y"]-11) + ")";}
	      })
	      .text(function(d){return [d.numVariants];});

	    listPhenoDone[d.Phenotype] = 1;
	  }

	  if(!(d.CodeSystem in listCodesDone)){ //circle's drawn once
	    //xCodeSystem = xCodeSystem + xOffset;
	    drawCircle(d,attatchToSVG, "CodeSystem"); //draw the corresponding CodeSystem circle
	    var currentCodeCircle = {"CodeSystem":d.CodeSystem, "numVariants":codeSystems[d.CodeSystem],"x":d["target"]["x"], "y":d["target"]["y"],"radius":(scaleCodeSystemCircle(codeSystems[d.CodeSystem]))};
	    g6.append('g').attr("class","CodeCircle").attr("codeSystem",d.CodeSystem)
	      .data([currentCodeCircle])
	      .append("circle")
	      .attr("transform", function(d) {
		return "translate(" + d["x"] + "," + d["y"] + ")"; })
	      .attr("r", function(d) {
		var radius = 0;
		radius = scaleCodeSystemCircle(codeSystems[d.CodeSystem]);
		return radius; })
	      .attr({stroke: '#F73A18', fill: '#B5DBF2', width: '2px'});

	    //now draw label
	    g6.append('g').attr("class","CodecircleNameText graphicWords").attr("codeSystem",d.CodeSystem)
	      .data([currentCodeCircle])
	      .append("text")
	      .attr("dy", ".3em")
	      .style("font-size",function(d,i) {return 0.8+"em";})
	      .style("text-anchor", "middle")
	    //.style("fill","#142E40")
	      .attr("transform", function(d) {
		//console.log(d);
		//radius larger than 11
		if ( d.radius > 11 ) {return "translate(" + (d["x"] ) + "," + d["y"] + ")";}
		else {return "translate(" + (d["x"] ) + "," + (d["y"]+15) + ")";}
	      })
	      .text(function(d){return [d.numVariants];});

	    listCodesDone[d.CodeSystem] = 1;

	    //		g6.append('g').attr("class","CodecircleNameText").attr("codeSystem",d.CodeSystem)
	    //		.data([currentCodeCircle])
	    //		.append("rect").style("fill","red")
	    //		.attr("transform", function(d) {
	    //console.log(d);
	    //			return "translate(" + (d["x"] ) + "," + d["y"] + ")"+" "+"rotate(300,-2,10)"; });

	  }

	  if(+d["numVariants"] > 0) {
	    //for when "&& (+data1[i][j]) ){ " is not used to exclude zero variant paths HBB goes from 523 to over 7000 paths when zero variant paths are included
	    return "show";
	  }
	  else{ return "hidden";}
	})
        .attr("d", d3.svg.diagonal())
      //.source(function(xPheno,yPosition){return {"x":xPheno,"y":yPosition};}).target(function(xCodeSystem,yPosition,yOffset){return {"x":xCodeSystem,"y":(yPosition+yOffset)};}))
        .attr("phenotype",function(d){return d["Phenotype"];})
        .attr("codeSystem",function(d){return d["CodeSystem"];})
        .attr("numVariants",function(d){return d["numVariants"];})
        .on("mouseover",function(){d3.select(this).attr({stroke: '#F73A18', fill: 'none', width: '10px'}).style("stroke-width","5px");})
        .on("mouseout",function(){d3.select(this).attr({stroke: '#142E40', fill: 'none', width: '10px'}).style("stroke-width","3px");})
      //.on("click",function(){
      //		d3.select(this).attr({stroke: 'red', fill: 'none', width: '10px'});
      //	  })
        .attr({stroke: '#142E40', fill: 'none'}).style("stroke-width","3px");

      ///unmapped phenotypes
      for (j in phenoRank){
	if ( (+(phenoRank[j]) < 10) && !(j in listPhenoDone) ){ //draw circle only if in top ten most frequently annotated
	  //console.log("j is",j);
	  currentPhenoCircle = {
	    "Phenotype":j,
	    "numVariants":phenoTypeTotals[j],
	    x: startX + phenoRank[j]*PhenoOffset,
	    y: phenoY,
	    "radius":(scalePhenotypeCircle(phenoTypeTotals[j]))
	  };

	  //circle
	  g6.append('g').attr("class","PhenoCircleNotMapped").attr("pheno",currentPhenoCircle.Phenotype)
	    .data([currentPhenoCircle])
	    .append("circle")
	    .attr("transform", function(d) {
	      return "translate(" + d["x"] + "," + d["y"] + ")"; })
	    .attr("r", function(d) {
	      var radius = 0;
	      radius = d.radius;
	      return radius; })
	    .attr({stroke: '#F73A18', fill: '#B5DBF2', width: '2px'});

	  //now draw label and attach data
	  g6.append('g').attr("class","PhenocircleNameText graphicWords").attr("pheno",d.Phenotype)
	    .data([currentPhenoCircle])
	    .append("text")
	    .attr("dy", ".3em")
	    .style("font-size",function(d,i) {return 0.8+"em";})
	    .style("text-anchor", "middle")
	  //.style("fill","Black")
	    .attr("transform", function(d) {
	      //radius larger than 11
	      if ( d.radius > 11 ) {return "translate(" + (d["x"] ) + "," + d["y"] + ")";}
	      else {return "translate(" + (d["x"] ) + "," + (d["y"]-11) + ")";}
	    })
	    .text(function(d){return [d.numVariants];});

	  listPhenoDone[currentPhenoCircle.Phenotype] = 1;
	}
      }

      //diagonal line
      g6.selectAll(".PhenoCircleNotMapped")
	.append("line")
	.style("stroke",'#F73A18')
	.attr("x1",function(d) { return (d.x + d.radius);})
	.attr("y1",function(d) { return (d.y - d.radius);})
	.attr("x2",function(d) { return (d.x - d.radius);})
	.attr("y2",function(d) { return (d.y + d.radius);})
      ;
      ///unmapped phenotypes

      ///unmapped codes systems
      for (j in codeSystemRank){
	if ( !(j in listCodesDone) ){ //draw circle
	  currentCodeCircle = {
	    "CodeSystem":j,
	    "numVariants":codeSystems[j],
	    x: startX + codeSystemRank[j]*CodeOffset,
	    y: codeSystemY,
	    "radius":(scaleCodeSystemCircle(codeSystems[j]))
	  };

	  //circle
	  g6.append('g').attr("class","CodeCircleNotMapped").attr("codeSystem",currentCodeCircle.CodeSystem)
	    .data([currentCodeCircle])
	    .append("circle")
	    .attr("transform", function(d) {
	      return "translate(" + d["x"] + "," + d["y"] + ")"; })
	    .attr("r", function(d) {
	      var radius = 0;
	      radius = d.radius;//scaleCodeSystemCircle(codeSystems[d.CodeSystem]);
	      return radius; })
	    .attr({stroke: '#F73A18', fill: '#B5DBF2', width: '2px'});

	  //now draw label
	  g6.append('g').attr("class","CodecircleNameText graphicWords").attr("codeSystem",d.CodeSystem)
	    .data([currentCodeCircle])
	    .append("text")
	    .attr("dy", ".3em")
	    .style("font-size",function(d,i) {return 0.8+"em";})
	    .style("text-anchor", "middle")
	  //.style("fill","#142E40")
	    .attr("transform", function(d) {
	      //console.log(d);
	      //radius larger than 11
	      if ( d.radius > 11 ) {return "translate(" + (d["x"] ) + "," + d["y"] + ")";}
	      else {return "translate(" + (d["x"] ) + "," + (d["y"]+15) + ")";}
	    })
	    .text(function(d){return [d.numVariants];});

	  listCodesDone[currentCodeCircle.CodeSystem] = 1;
	}
      }

      //diagonal line
      g6.selectAll(".CodeCircleNotMapped")
	.append("line")
	.style("stroke",'#F73A18')
	.attr("x1",function(d) { return (d.x + d.radius);})
	.attr("y1",function(d) { return (d.y - d.radius);})
	.attr("x2",function(d) { return (d.x - d.radius);})
	.attr("y2",function(d) { return (d.y + d.radius);})
      ;
      ///unmapped codes systems


      //console.log("list",listCodesDone);
      //adds titles for mouse over details
      g5.selectAll(".phenoTocodeSystemPaths").append("title").text(function(d){return d["numVariants"]+" mapped from "+d["Phenotype"]+" to "+d["CodeSystem"];}).attr("font-size","10px");
      g6.selectAll(".CodecircleNameText").append("title").text(function(d){return "Variants = "+ d["numVariants"];}).attr("font-size","10px");
      g6.selectAll(".PhenoCircle").append("title").text(function(d){return [d.Phenotype]+"  has "+ d["numVariants"]+" variants";}).attr("font-size","10px");
      g6.selectAll(".CodeCircle").append("title").text(function(d){return [d.CodeSystem]+"  has "+ d["numVariants"]+" variants";}).attr("font-size","10px");
      g6.selectAll(".PhenoCircleNotMapped").append("title").text(function(d){return [d.Phenotype]+"  has "+ d["numVariants"]+" variants";}).attr("font-size","10px");
      g6.selectAll(".CodeCircleNotMapped").append("title").text(function(d){return [d.CodeSystem]+"  has "+ d["numVariants"]+" variants";}).attr("font-size","10px");

      //draw label text so it is on top.
      g6.selectAll(".CodecircleNameText")
	.append("text")
	.attr("class","graphicNumber")
	.attr("circleNameText",function(d){return [d.CodeSystem];})
	.attr("dy", ".3em")
	.style("font-size",function(d,i) {return 0.8+"em";})
	.style("text-anchor", "end")
      //.style("fill","#142E40")
	.attr("transform", function(d) {
	  //console.log("dog", d);
	  var position = +scaleCodeSystemCircle(+d["numVariants"]);
	  return "translate(" + (d["x"] ) + "," + (d["y"] + 30) + ")"+" "+"rotate(280)";})//,+2,10)"; })
	.text(function(d){return [d.CodeSystem];});

      //if (containerWidth<= 500) {
      g6.selectAll(".PhenocircleNameText")
	.append("text")
	.attr("class","graphicNumber")
	.attr("circleNameText",function(d){return [d.Phenotype];})
	.attr("dy", ".3em")
	.style("font-size",function(d,i) {return 0.8+"em";})
	.style("text-anchor", "end")
      //.style("fill","#142E40")
	.attr("transform", function(d) {
	  //console.log("dog", d);
	  var position = +scalePhenotypeCircle(+d["numVariants"]);
	  return "translate(" + (d["x"] ) + "," + ((d["y"] - 30)) + ")"+" "+"rotate(65)";})//,+2,10)"; })
	.text(function(d){return [d.Phenotype];});
      //}
      //draw circles
      //connected by Phenotype or CodeSystem attr to paths +


    }





    //////////////////////////////////////////////EXPERIMENTAL BELOW THIS LINE///////////////////////////////////////////
    //for returning to default overview


    //create paths attach myData to path
    //now the below is based on accessing path
    //circle drawing is based on direction...

    function drawCircle(d,x, yPosition, attatchToSVG, label) {}

    //each circle should call this function on click
    function circleFocus (circleOfInterest, x, yPosition, yOffset, attatchToSVG, circleType) {
      g5.select('phenoTocodeSystemPaths').selectAll('path').enter() //each path has {"Phenotype":"","CodeSystem":"","numVariants":#}
      //if phenotype
      //collect occurrence of each codeSystem in cur_codeSystems
      //if code-systems
      //sort paths by numVariants and then produce them

        .style("visibility", function (d,i) { //d is the current path
	  if (circleType == "Pheno") {
	    //when focus is phenotype  Draw One phenotype circle use numVaraint value
	    //then send path's data on codesystems to multi-circle drawer
	    if (d.Phenotype == circleOfInterest){
	      if (i == 0) {drawCircle(d,x, yPosition, attatchToSVG, "Pheno");} //draw phenotype circle once
	      drawCircle(d,x, (yPosition+yOffset), attatchToSVG, "CodeSystem"); //draw the corresponding CodeSystem circle
	      return "show";
	    }
	    else{ return "hidden";} //don't show path
	  }
	  //when focus is phenotype  Draw One phenotype circle use numVaraint value
	  //then send path's data on codesystems to multi-circle drawer
	  if (circleType == "CodeSystem") {
	    if (d.Phenotype == circleOfInterest){
	      if (i == 0) {drawCircle(d,x, (yPosition+yOffset), attatchToSVG, "CodeSystem");} //draw phenotype circle once
	      drawCircle(d,x, yPosition, attatchToSVG, "Pheno"); //draw the corresponding CodeSystem circle
	      return "show";
	    }
	    else{ return "hidden";} //don't show path
	  }
        })

        .attr("d", d3.svg.diagonal().source({x:x,y:yPosition}).target({x:x,y:(yPosition+yOffset)}))

        .attr({stroke: 'black', fill: 'none', width: '2px'})
        .attr("title").text(function(d){return "Variants = "+d.numVariants;});
    }


    //when phenotype selected iterate over myData by looking at value of Phenotype: in each, current max is 714 so it should remain scalable!
    //when phenotype found change visibility
    //.style("visibility",function(d,i) { <------------THIS IS FOR PATH!
    //			  if (myData[i].Phenotype == phenotypeOfInterest) {
    //					return "show";
    //			  }
    //			  else{ return "hidden";}
    //			}
    //Then need to do a sort of codeSystems that are mapped to by phenotypeOfInterest based on number of variants in path
    //.transition! move codeSystem circles based on order number
    //);

    //when codeSystem selected iterate over myData by looking at value of codeSystem: in each, current max is 714 so it should remain scalable!
    //when codeSystem found change visibility
    //.style("visibility",function(d,i) {
    //			  if (myData[i].codeSystem == codeSystemOfInterest) {
    //					return "show";
    //			  }
    //			  else{ return "hidden";}
    //			});
    //Then need to do a sort of Phenotypes that are mapped to by codeSystemOfInterest based on number of variants in path
    //.transition! move Phenotypes circles based on order number
    //);



    //all these should be functions
    //sort by most occurant phenotype
    //sort codeSystems

    //Default view is all paths, clicking circle illuminates the connected paths (support of filtering)
    //need default button
    //slider number of variants filter?

    //make phenotype circles
    //on click highlight paths/show path titles at end of path near codeSystem the title has the number of variants in that path
    //on hover get some details
    //circleNameSizes should have the form [{name:#,...
    //yPosition places the circles on the SVG indicated
    //attatchToSVG the name of the SVG element to attatch too
    function makeSomeCircles (circleNamesSizes, yPosition, attatchToSVG, pathType) {
      var startX = 50;
      var codeSystemY =  200;
      var phenoY =  50;
      var PhenoOffset= 10;
      var currentColumn = 0;
      for (var j =0;j<numberRows;j++) { // phenotype circles
        PhenoOffset = PhenoOffset + 60;
        for (currentC = 0; currentC < 4; currentC++) {
          currentColumn = currentC + currentColumn;
          g5.append('g').attr("class","phenoCircle").attr("codeSystem",codeSystem).attr("pheno",phenotype)
            .selectAll('circle')
            .data([ {x: startX + PhenoOffset, y: phenoY}, {x: startX + currentColumn*50, y: codeSystemY}])
            .enter()
            .append("circle")
            .attr("transform", function(d) { return "translate(" + (d.x ) + "," + d.y + ")"; })
            .attr("r", function(d,i) {
	      var radius = 0;
              if (i == 0) { radius = scalePhenotypeCircle(25);}
              if (i == 1) { radius = scaleCodeSystemCircle(500);}
	      console.log(i);
	      return radius; }) //i = 0 is phenotype, i = 1 is codesystem
            .attr("Pheno",function(d) { console.log("Xylem"); return PhenoOffset;})
            .attr({stroke: 'black', fill: '#fff', width: '2px'});

          g5.append('g').selectAll("phenoCircle")
            .data([ {x: startX + PhenoOffset, y: phenoY - (1.5*10+(startX + PhenoOffset)/50)}, {x: startX + currentColumn*50, y: codeSystemY +(1.5*10+(startX + PhenoOffset)/50)}])
            .enter()
	    .append("text")
	    .attr("font-size","10px")
	    .attr("transform", function(d) { return "translate(" + (d.x ) + "," + d.y + ")"; })
          //.attr("dx", function(d) { return 10; })
            .attr("dy", ".35em")
            .attr("text-anchor","middle")// function(d) { return 10; })
            .style("fill","black")
            .text("hello");
        }
      }
    }

    //first make all paths
    //label with phenotype and codeSystem and give numVar as part of path


    //phenotype selected -> show only attached codesSystems, order left to right by number of variants take from Path!

    //codeSystem selected -> show only attached phenotypes, order left to right by number of variants take from Path!


    //paths have counts of variants (are specific)

    //create some circles
    //need y position, sizes, names
    //sort circles so that biggest is first?,,,don't do this if
    //makes circles attach function for showing paths


    //make codeSystems circles
    //on click highlight paths/show path titles at end of path near codeSystem the title has the number of variants in that path
    //on hover get some details
    //function codeSystemCreate (


    //make paths
    //thicken on mouse over but will be difficult to see

    //for first row create x,y coordinates and circles for all the lower for all the columns
    //for each phenotype
    //create circle and x,y coordinates
    //create a path
    //with id and class

    //circle creation of coding systems requires knowing how many variants

  }); //d3.tsv
  //console.log(moustache);
})
