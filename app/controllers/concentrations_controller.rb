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

end
