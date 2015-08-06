


$( function varStarNumCurrent() {


//var star_Num_tsv = ["starNumCurrent", pageName].join('') // this takes care of null pageName
//	d3.tsv("data/starNum/"+star_Num_tsv+".tsv", function(data) {
 d3.tsv(gon.tsv_paths['starNumCurrent'], function(data) {
		return {
			label: data.label,
			value: +data.value,
		};
		}, function(error, data) {
var starPieLocation = document.querySelectorAll(".graph.starNumCurrent");
var pie = new d3pie( starPieLocation[0], {
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
      "canvasWidth": parseInt(d3.select(".graph.starNumCurrent").style("width"),0),
      "canvasHeight": parseInt(d3.select(".graph.starNumCurrent").style("width"),0), //want to be mostly square - works best based on width
      "pieInnerRadius": "70%",
      "pieOuterRadius": "80%"
  },
  "data": {
      "sortOrder": "value-desc",
      "content": data
  },
  "labels": {
      "outer": {
          "pieDistance": 12
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
			"segments": ["#F73A18","#142E40","#142E40","#142E40","#142E40","#142E40"],
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
 console.log('starNumCurrent')
})
