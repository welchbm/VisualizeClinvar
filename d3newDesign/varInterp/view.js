//gives browser instruction to run on load and adds it as a procedure so that other scripts will also run

$( function varInterp() {
//data/varInterp/
//var var_Interp_tsv = ["varInterp", pageName].join('') // this takes care of null pageName
//	d3.tsv("http://localhost:8080/"+var_Interp_tsv+".tsv", function(data) {
 d3.tsv(gon.tsv_paths['varInterp'], function( data) {
		return {
			label: data.label,
			value: +data.value
		};
		}, function(error, data) {
	//d3.tsv.parse("data/varType/"+var_interp_tsv+".tsv", function(error, data) { //pageName comes from the page: see html
		console.log(data);
	//	console.log("what is going on?");
var pieLocation = document.querySelectorAll(".graph.varInterp");
var pie = new d3pie(pieLocation[0], {
  "header": {
      "subtitle": {
          "color": "#999999",
          "fontSize": 12,
          "font": "helvetica"
      },
      "titleSubtitlePadding": 9
  },
  "footer": {
      "color": "#999999",
      "fontSize": 10,
      "font": "open sans",
      "location": "bottom-left"
  },
  "size": {
      "canvasWidth": parseInt(d3.select(".graph.varInterp").style("width"),0),
      "canvasHeight": parseInt(d3.select(".graph.varInterp").style("width"),0),
      "pieInnerRadius": "0%",
      "pieOuterRadius": "90%"
  },
  "data": {
      "sortOrder": "value-desc",
      "content": data
  },
  "labels": {
      "outer": {
          "pieDistance": 22
      },
      "inner": {
          "hideWhenLessThanPercentage": 3
      },
      "mainLabel": {
          "fontSize": 9
      },
      "percentage": {
          "color": "#ffffff",
          "decimalPlaces": 0
      },
      "value": {
          "color": "#adadad",
          "fontSize": 9
      },
      "lines": {
          "enabled": true
      }
  },
  "effects": {
      "pullOutSegmentOnClick": {
          "effect": "linear",
          "speed": 400,
          "size": 8
      }
  },
  "misc": {
		"colors":{
			"background": "#dae9f2",
			"segments": [
			"#142E40","#F73A18","#61142D","#F3DC00","#54BF26","#B5DBF2", "#142E40","#F73A18","#61142D","#F3DC00","#54BF26","#B5DBF2","#142E40","#F73A18","#61142D","#F3DC00","#54BF26","#B5DBF2",
			],

		},
      "gradient": {
          "enabled": true,
          "percentage": 100
      },
	  "canvasPadding": {
		"top":10,
		"right":10,
		"bottom":10,
		"left":10,
		}
  }
})
})
console.log('varInterp')
})
