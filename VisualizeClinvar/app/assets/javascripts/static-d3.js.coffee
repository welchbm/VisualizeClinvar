# Make d3 graphs static by removing event handlers, tooltips
# and UI elements from the graphs.
# Must be run after d3 graphs are already in place.
$("").ready ->
  # remove mouseover listeners on svg elements
  d3.select('svg').selectAll('*').on('mouseover', null)

  # force d3 transitions to finish
  var now = Date.now;
  Date.now = function() { return Infinity; };
  d3.timer.flush();
  Date.now = now;

  # remove UI elements on graphs
  $("select").remove()

  # remove tooltips on graphs
  $("svg title").remove()