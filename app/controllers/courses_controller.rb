class CoursesController < ApplicationController
  def index
    @courses = Course.all
    render json: @courses.to_json(include: { meetings: { include: :enrollments }})
  end

  def show
    @course = Course.find_by_id(params[:id])
  end
end
