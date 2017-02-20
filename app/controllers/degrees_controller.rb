class DegreesController < ApplicationController
  def index
    @degrees = Degree.all
    render json: @degrees.to_json
  end

  def show
    @degree = Degree.find_by_id(params[:id])
    render json: @degree.to_json
  end

  def update
    @degree = Degree.find_by_id(params[:id])
    if @degree.update(degree_params)
      render json: @degree.to_json
    else
      render json: @degree.errors.full_messages.to_json
    end
  end

  private
    def degree_params
      params.require(:degree).permit(:name, :description)
    end
end
