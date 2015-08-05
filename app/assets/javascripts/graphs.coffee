# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
  if $('body.graphs.index').length > 0
    squareUp = ->
      $graphs = $('.blue-mother')
      $graphs.each (index, elt) ->
        $(this).height($(this).width())

    squareUp()
    $(window).resize(squareUp)