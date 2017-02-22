class DegreesController < ApplicationController
  def index
    @degrees = Degree.all
    render json: @degrees.to_json
  end

  def show
    @degree = Degree.find_by_id(params[:id])
    render json: @degree.to_json({ include: [
      :required_courses, concentrations: { include: [
        :non_thesis_track, { thesis_track: { include: :courses } }, { categories: { include: :courses } }]
      }]
    })
  end

  def update
    @degree = Degree.find_by_id(params[:id])
    if @degree.update(degree_params)
      render json: @degree.to_json(include: [:concentrations, :required_courses])
    else
      render json: @degree.errors.full_messages.to_json
    end
  end

  private
    def degree_params
      params.permit(:id, :name, :description,
      concentrations_attributes: [:id, :degree_id, :name, :description, { categories: [
        :id, :concentration_id, :name, :required_units
      ] }], required_course_ids: [] )
    end
end
