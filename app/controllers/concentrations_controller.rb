class ConcentrationsController < ApplicationController
# TODO see if necessary
  def index
    @concentrations = Concentration.all
    render json: @concentrations, status: 200
  end

  def show
    @concentration = Concentration.find(params[:id])
    @degree = @concentration.degree
    @required_courses = @degree.required_courses
    @categories = @concentration.categories.includes(:courses)
  end

  def update
    @concentration = Concentration.find(params[:id])
    if @concentration.update(concentration_params)
      render json: @concentration.to_json
    else
      render json: @concentration.errors.full_messages.to_json
    end
  end

  def concentration_params
    params.permit(:id, :name)
  end

end
