class CoursesController < ApplicationController

  before_action :set_course, only: [:show]

  def index
    @courses = Course.all
    render json: @courses.to_json(include: { meetings: { include: :enrollments }})
  end

  def show
    render json: @course
  end

  def create
    @course = Course.new(course_params)
    if @course.save
      params[:sessions].each do |sessions_id|
        @course.sessions << session_id
      end

      render json: @course
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  private

    def course_params
      params.require(:course).permit(:name, :number, :term_id, :description, :units, :level, :category_id, sessions: [])
    end

    def set_course
      @course = Course.find(params[:id])
    end

end
