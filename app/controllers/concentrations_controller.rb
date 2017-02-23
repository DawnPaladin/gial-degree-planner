class ConcentrationsController < ApplicationController
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

  def create
    @concentration = Concentration.new(concentration_params)
    if @concentration.save
      redirect_to concentration_path(@concentration, format: :json)
    else
      render json: @concentration.errors.full_messages.to_json
    end
  end

  def concentration_params
    params.permit(:id, :name, :degree_id, { categories_attributes: [:id, :concentration_id, :name, :required_units, course_ids: [] ]})
  end

end
