# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
  if $('body.graphs.index').length > 0
    squareUp = ->
      $graphs = $('.blue-mother')
      height = 0
      $graphs.each (index, elt) ->
        $this = $(this)
        if $this.parent().hasClass('col-md-4')
          height = $this.parent().width()

      $graphs.each (index, elt) ->
        $(this).height(height)

    squareUp()
    $(window).resize(squareUp)