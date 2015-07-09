class GraphsController < ApplicationController
  def show
    @page_title = params[:id].titleize
  end
end
