var graphs = null;

// Finds the maximum height of all .graph nodes and sets the
// minimum-height attribute on all .graph nodes to match that
// value.
var normalizeGraphHeights = function() {
    var graphHeights = graphs.map(function() {
        return parseInt($(this).css("height") || $(this).height());
    }).get();

    var maxHeight = Math.max.apply(null, graphHeights);

    if (maxHeight) {
        graphs.css("min-height", maxHeight);
    }
};

// Returns true if there are any .graph nodes that do not have
// a child svg node.
var anySvgsMissing = function() {
    var graphsMissingSvgs = graphs.filter(function() {
        return $(this).find("svg").length === 0;
    });

    return graphsMissingSvgs.length > 0;
};

var svgChecks = 0;

// Checks to see if any .graph nodes are still missing a child
// svg node. If so, the associated view.js script has not been
// run for that graph yet, so wait for 50ms and check again.
var checkSvgs = function() {
    if (anySvgsMissing() && svgChecks++ < 5) {
        setTimeout(checkSvgs, 50);
    } else {
        normalizeGraphHeights();
    }
};

// Don't assign a value to the "graphs" variable until the DOM
// has been fully loaded. After "graphs" has been assigned, run
// the first check for missing svg nodes.
$(document).ready(function() {
    graphs = $(".graphs .graph");
    checkSvgs();
});