class GraphsController < ApplicationController

  # home page
  def index
    @graphs = Graph.all_in_gene('global')
  end

  # show interactive graph
  def show
    @graph = Graph.new(params[:gene], params[:graph])
  end
end
