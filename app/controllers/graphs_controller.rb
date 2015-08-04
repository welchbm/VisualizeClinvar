class GraphsController < ApplicationController

  # show graphs for a gene
  def index
    @graphs = Graph.all_in_gene(params[:gene] || 'global')

    # share tsv paths needed for each graph with javascript
    tsv_paths = {}
    @graphs.each do |graph|
      tsv_paths[graph.graph] = graph.tsv_path
    end
    gon.tsv_paths = tsv_paths
  end

  # show interactive graph
  def show
    @graph = Graph.new(params[:gene], params[:graph])
    gon.tsv_paths = { @graph.graph => @graph.tsv_path }
  end
end
