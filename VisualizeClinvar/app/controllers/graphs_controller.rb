class GraphsController < ApplicationController
  def show
    @graph = Graph.find(params[:id])
    redirect_to root_url if @graph.nil?
  end
end
