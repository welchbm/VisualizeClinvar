var infographics = {
  historyGraphic :
  {
    title: "Total Number of Variants",
    type: "chart",
    short_description: "Cumulative total of Submitted variants.",
    description: "Shows the cumulative total of submitted variants. Based on the current release date. Due to the nature of the data in ClinVar (occasional bulk submissions from large repositories), newer releases dates of the ClinVar database can contain New variants with submission dates prior to previous database release dates.",
    callback: "historyGraphIt"
  },
  quickStats :
  {
    title: "Totals",
    type: "words",
    short_description: "Current total number of variants",
    description: "ClinVar annotations include gene symbols, phenotypic data, interpretations and variant types. Please see the ClinVar website for deep details. The graph here shows how a simple computer algorithm would count the number of unique identifiers.",
    callback: "quickStatic"
  },
  varInterpGraphic : {
    title: "Total Interpretations",
    type: "pie",
    short_description: "Percent of genetic variants with a specific interpretation.",
    description: "",
    callback: "varInterp"
  },
  geneBubbleIc : {
    title: "Gene Bubbles",
    type: "multi-dimensional bubble-motion",
    short_description: "Attempts to capture gene-level changes in the database over Release date",
    description: "Each bubble is one gene. The Y-axis and bubble size represent the number of variants. Thus, genes with more annotated variants 'float' to the top. The X-axis is the number of distinct phenotypes on a Logarithmic scale. The color of the bubble indicates the most common interpretation of variants for a given gene.",
    callback: "geneBubbleIt"
  },
  RadialsPhenoTermoIC : {
    title: "Phenotype Terminology Radials",
    type: "radials",
    short_description: "Shows the percent of variants annotated by each terminology.",
    description: "",
    callback: "startRadialsPhenoTermo"
  },
  RadialsGeneDBinfoIC : {
    title: "Annotation of phenotype with Gene/database information",
    type: "radials",
    short_description: "Shows the percent of variants annotated by specific external resources.",
    description: "",
    callback: "startRadialsGeneDBInfo"
  },
  varTypeIC : {
    title: "Variant Type",
    type: "pie",
    short_description: "Percent of genetic variants with specific type.",
    description: "",
    callback: "varType"
  },
  chromoRaceIC : {
    title: "Variants per Chromosome",
    type: "scatterplot with images",
    short_description: "Compares chromosome relative size with number of variants. The diagonal is the average ratio of variants per nucleotides.",
    description: "Each chromosome picture is from a Karaotype and is actual relative size. The graph shows that Chromosome 17 has more variants per nucleotide than the average chromosome. Chromosome 1 has less.",
    callback: "chromoCountRaceIt"
  },
  starNum : {
    title: "StarNumHistory",
    type: "stacked area chart",
    short_description: "Changes in the distribution of evidence annotations based on Submission Date.",
    description: "",
    callback: "starNum"
  },
  starNumCurrentgraphic : {
    title: "Annotation of Evidence",
    type: "pie",
    short_description: "Distribution of evidence annotations.",
    description: "ClinVar uses several categories to indicate the evidence of assertions such as phenotype.",
    callback: "varStarNumCurrent"
  }};


var setup = false;

function switch_view(oneup) {
  /*
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1">
      </div>
      <div class="col-md-4" id="about">
      */
  // need to find div with container-fluid class
  // add new div class row
  // remove about column
  
  //??? jquery seelectors
  
  oneupid = $(oneup).attr("id");
  
  if (!setup) {
    $("#about").remove();  
    
    // need to re-arrange everything into new layout
    $("#page_content div.row:nth-child(1)").append($("#geneBubbleIc"));
    $("#page_content div.row:nth-child(1)").append($("#RadialsPhenoTermoIC"));
    $("#page_content div.row:nth-child(2)").append($("#starNum"));
    
    // add large view
    $("#page_content").prepend("<div class='row' id='large_view'></div>");
    setup = true;
  }
  
  $('#large_view').empty();
  $('#large_view').append("<div class='col-md-1 shift-down'><i class='fa fa-caret-square-o-left fa-9x text-grey'></i></div>");
  
  $('#large_view').append("<div class='col-md-3'>" +
                          "<h2>" + infographics[oneupid].title + "</h2>" +
                          "<h4>Type: " + infographics[oneupid].type + "</h4>" +
                          "<p>" + infographics[oneupid].short_description + "</p>" +
                          "<p>" + infographics[oneupid].description + "</p>" +
                          "</div>");
  
  $('#large_view').append($(oneup).clone().attr({
    class: "col-md-7"
  }));
  $('#large_view > #' + $(oneup).attr("id")).empty();
  
  window[infographics[oneupid].callback]();
  
  $('#large_view').append("<div class='col-md-1 shift-down'><i class='fa fa-caret-square-o-right fa-9x text-grey'></i></div>");
}

function setup_events (key) {
  key.click(function(){
    switch_view(this);
  });
  key.hover(function() {
    // need to do something here to indicate clicking, also show hover text
    }, function() {
      //hide hover text
  });
}


// add listeners to all the graphics to make them clickable
$(document).ready(function() {
  for (var key in infographics) {
    setup_events($("#" + key));
  }
});
