class DegreesController < ApplicationController
  def index
    @degrees = Degree.all
    render json: @degrees.to_json
  end

  def show
    @degree = Degree.find_by_id(params[:id])
    render json: @degree.to_json
  end
end
