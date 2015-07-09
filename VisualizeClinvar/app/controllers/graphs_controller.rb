class GraphsController < ApplicationController
  def show
    @graph = Graph.new(params[:id])
    redirect_to root_url if @graph.error
  end
end
