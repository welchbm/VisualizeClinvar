class HomePageController < ApplicationController

  def index
    @graphs = Graph.all
  end
end
