class CoursesController < ApplicationController

  before_action :set_course, only: [:update]
  before_action :require_admin, only: [:update, :create]

  def index
    @courses = Course.includes(meetings: :enrollments)
    render json: @courses.to_json(include: [{ meetings: { include: :enrollments }}, sessions: { only: :id }])
  end

  def show
    @course = Course.includes(:sessions).find(params[:id])
    render json: @course.to_json(include: { sessions: @course.sessions.pluck(:id) })
  end

  def create
    @course = Course.new(course_params)
    binding.pry
    if @course.save
      params[:session_ids].each do |session_id|
        @course.sessions << Session.find_by_id(session_id)
      end

      render json: @course.to_json(include: [{ meetings: { include: :enrollments }}, sessions: { only: :id }])
    else
      render json: { errors: @course.errors, status: :unprocessable_entity }
    end
  end

  def update
    if @course.update_attributes(course_params)
      sessions = params[:session_ids].map { |id| Session.find(id) }
      @course.sessions = sessions
      render json: @course.to_json(include: [{ meetings: { include: :enrollments }}, sessions: { only: :id }])
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  private

    def course_params
      params.require(:course).permit(:name, :number, :local, :term_id, :description, :units, :level, :category_id, sessions: [])
    end

    def set_course
      @course = Course.find(params[:id])
    end

end
