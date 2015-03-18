//gives browser instruction to run on load and adds it as a procedure so that other scripts will also run
if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            varType();
        };
        window.onload = newonload;
} else {
    window.onload = varStarNumCurrent();
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


function varStarNumCurrent() {

var color = d3.scale.category20();

var star_Num_tsv = ["starNumCurrent", pageName].join('') // this takes care of null pageName
	d3.tsv("data/starNum/"+star_Num_tsv+".tsv", function(data) {
		return {
			label: data.label,
			value: +data.value,
			color: data.color
		};
		}, function(error, data) {

var pie = new d3pie("starNumCurrentgraphic", {
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
      "canvasWidth": parseInt(d3.select("#starNumCurrentgraphic").style("width"),0),
      "canvasHeight": parseInt(d3.select("#starNumCurrentgraphic").style("width"),0), //want to be mostly square - works best based on width
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
      "gradient": {
          "enabled": true,
          "percentage": 100
      }
  }
})
})
}
