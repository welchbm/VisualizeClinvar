//responsible person Bret bheale@gmail.com

//startRadialsGeneDBInfo();
$( function startRadialsGeneDBInfo() {
function labelFunction(val,min,max) {

}

function deselect() {
    div1.attr("class","radial");
    div2.attr("class","radial");
    div3.attr("class","radial");
}


//function startRadialsGeneDBInfo() {

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

//d3.csv('tsv/stats.tsv', function(error, data) {
d3.tsv(gon.tsv_paths['radialsGeneDBinfo'],function(error, data) {
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
  var diameterRadial = 135;
  var width = parseInt(d3.select(".graph.radialsGeneDBinfo").style("width"), 0) + "px";
  var height = parseInt(0.70 * parseInt(d3.select(".graph.radialsGeneDBinfo ").style("width"), 0), 0) + "px";

  d3.select(".graph.radialsGeneDBinfo ").append("div").attr("class","RadialsInner");

  for (var i = 0; i < headers.length; i++) { //iterates

	data[0][headers[i]] = +data[0][headers[i]];
	if (!(isNaN(data[0][headers[i]]) )){
		d3.select(".graph.radialsGeneDBinfo ").select(".RadialsInner").append("div").style("float","left").attr("id","radialGeneDBInfo-div"+headers[i]).call(drag).call(zoom); //make target div
		var rp1 = radialProgress(document.getElementById("radialGeneDBInfo-div"+headers[i])) //radial baby
            .label(headers[i])
            //.onClick(onClick1)
            .diameter(diameterRadial)
            .value(data[0][headers[i]])
            .render();
	}
  }

});
/**
 Copyright (c) 2014 BrightPoint Consulting, Inc.

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */

function radialProgress(parent) {
    var _data=null,
        _duration= 1000,
        _selection,
        _margin = {top:10, right:10, bottom:10, left:10},
        __width = 130,
        __height = 130,
        _diameter = 50,
        _label="",
        _fontSize=12;


    var _mouseClick;

    var _value= 0,
        _minValue = 0,
        _maxValue = 100;

    var  _currentArc= 0, _currentArc2= 0, _currentValue=0;

    var _arc = d3.svg.arc()
        .startAngle(0 * (Math.PI/180)); //just radians

    var _arc2 = d3.svg.arc()
        .startAngle(0 * (Math.PI/180))
        .endAngle(0); //just radians


    _selection=d3.select(parent);


    function component() {

        _selection.each(function (data) {

            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);

            var enter = svg.enter().append("svg").attr("class","radial-svg").append("g");

            measure();

            svg.attr("width", __width)
                .attr("height", __height);


            var background = enter.append("g").attr("class","component")
                .attr("cursor","pointer")
                .on("click",onMouseClick);


            _arc.endAngle(360 * (Math.PI/180))

            background.append("rect")
                .attr("class","background")
                .attr("width", _width)
                .attr("height", _height);

            background.append("path")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc);

            background.append("text")
		.style("font-size",_fontSize+"px")
                .attr("class", "label")
                .attr("transform", "translate(" + _width/2 + "," + (_width + _fontSize) + ")")
                .text(_label);
           var g = svg.select("g")
                .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");


            _arc.endAngle(_currentArc);
            enter.append("g").attr("class", "arcs");
            var path = svg.select(".arcs").selectAll(".arc").data(data);
            path.enter().append("path")
                .attr("class","arc")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc);

            //Another path in case we exceed 100%
            var path2 = svg.select(".arcs").selectAll(".arc2").data(data);
            path2.enter().append("path")
                .attr("class","arc2")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc2);


            enter.append("g").attr("class", "labels");
            var label = svg.select(".labels").selectAll(".label").data(data);
            label.enter().append("text")
                .attr("class","label centerlabel")
                .attr("y",_width/2+_fontSizeCenter/3)
                .attr("x",_width/2)
                .attr("cursor","pointer")
                .attr("width",_width)
                // .attr("x",(3*_fontSize/2))
                .text(function (d) { return Math.round((_value-_minValue)/(_maxValue-_minValue)*100) + "%" })
                .style("font-size",_fontSizeCenter+"px")
                .on("click",onMouseClick);

            path.exit().transition().duration(500).attr("x",1000).remove();


            layout(svg);

            function layout(svg) {

                var ratio=(_value-_minValue)/(_maxValue-_minValue);
                var endAngle=Math.min(360*ratio,360);
                endAngle=endAngle * Math.PI/180;

                path.datum(endAngle);
                path.transition().duration(_duration)
                    .attrTween("d", arcTween);

                if (ratio > 1) {
                    path2.datum(Math.min(360*(ratio-1),360) * Math.PI/180);
                    path2.transition().delay(_duration).duration(_duration)
                        .attrTween("d", arcTween2);
                }

                label.datum(Math.round(ratio*100));
                label.transition().duration(_duration)
                    .tween("text",labelTween);

            }

        });

        function onMouseClick(d) {
            if (typeof _mouseClick == "function") {
                _mouseClick.call();
            }
        }
    }

    function labelTween(a) {
        var i = d3.interpolate(_currentValue, a);
        _currentValue = i(0);

        return function(t) {
            _currentValue = i(t);
            this.textContent = Math.round(i(t)) + "%";
        }
    }

    function arcTween(a) {
        var i = d3.interpolate(_currentArc, a);

        return function(t) {
            _currentArc=i(t);
            return _arc.endAngle(i(t))();
        };
    }

    function arcTween2(a) {
        var i = d3.interpolate(_currentArc2, a);

        return function(t) {
            return _arc2.endAngle(i(t))();
        };
    }


    function measure() {
        _width=_diameter - _margin.right - _margin.left - _margin.top - _margin.bottom;
        _height=_width;
        _fontSize=_width*.15;
        _fontSizeCenter=_width*.21;
        _arc.outerRadius(_width/2);
        _arc.innerRadius(_width/2 * .50);
        _arc2.outerRadius(_width/2 * .50);
        _arc2.innerRadius(_width/2 * .50 - (_width/2 * .15));
    }


    component.render = function() {
        measure();
        component();
        return component;
    }

    component.value = function (_) {
        if (!arguments.length) return _value;
        _value = [_];
        _selection.datum([_value]);
        return component;
    }


    component.margin = function(_) {
        if (!arguments.length) return _margin;
        _margin = _;
        return component;
    };

    component.diameter = function(_) {
        if (!arguments.length) return _diameter
        _diameter =  _;
        return component;
    };

    component.minValue = function(_) {
        if (!arguments.length) return _minValue;
        _minValue = _;
        return component;
    };

    component.maxValue = function(_) {
        if (!arguments.length) return _maxValue;
        _maxValue = _;
        return component;
    };

    component.label = function(_) {
        if (!arguments.length) return _label;
        _label = _;
        return component;
    };

    component._duration = function(_) {
        if (!arguments.length) return _duration;
        _duration = _;
        return component;
    };

    component.onClick = function (_) {
        if (!arguments.length) return _mouseClick;
        _mouseClick=_;
        return component;
    }

    return component;

}
console.log('radialsGeneDBinfo');
})