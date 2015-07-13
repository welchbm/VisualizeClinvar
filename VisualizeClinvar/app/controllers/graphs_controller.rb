class GraphsController < ApplicationController

  # show graphs for a gene
  def index
    @graphs = Graph.all_in_gene(params[:gene] || 'global')
  end

  # show interactive graph
  def show
    @graph = Graph.new(params[:gene], params[:graph])
    gon.tsv_path = @graph.tsv_path
  end
end
