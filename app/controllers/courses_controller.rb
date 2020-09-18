class CoursesController < ApplicationController

  before_action :set_course, only: [:update, :destroy]
  before_action :require_admin, only: [:update, :create, :destroy]

  def index
    @courses = Course.includes(meetings: :enrollments)
    render json: @courses.to_json(include: [{ meetings: { include: :enrollments }}, { sessions: { only: :id }}, { terms: { only: [:id, :name]}}], methods: :enrolled_students)
  end

  def show
    @course = Course.includes(:sessions).find(params[:id])
    render json: @course.to_json(include: { sessions: @course.sessions.pluck(:id), terms: @course.terms.pluck(:id) })
  end

  def create
    @course = Course.new(course_params)
    if @course.save
      render json: @course.to_json(include: [{ meetings: { include: :enrollments }}, { terms: { only: :id }}, { sessions: { only: :id }}])
    else
      render json: { errors: @course.errors, status: :unprocessable_entity }
    end
  end

  def update
    if @course.update_attributes(course_params)
      render json: @course.to_json(include: [{ meetings: { include: :enrollments }}, { terms: { only: :id }}, { sessions: { only: :id }}])
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  def destroy
    enrolled_students = @course.enrolled_students
    if enrolled_students.length == 0
      if @course.destroy
        render json: @course
      else
        render json: { errors: @course.errors }
      end
    else
      names = enrolled_students.map {|student| student[:name]}.join(', ')
      render json: { errors: "Course has #{enrolled_students.length} enrolled student(s): #{names}. Disenroll them before deleting this course."}
    end
  end

  private

    def course_params
      params.permit(:id, :name, :number, :local, :description, :units, :level, :category_id, session_ids: [], term_ids: [])
    end

    def set_course
      @course = Course.find(params[:id])
    end

end
