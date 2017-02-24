class StudentsController < ApplicationController

  before_action :require_admin, only: [:update, :create]

  def index
    @students = Student.all
  end

  def show
    @student = Student.find(params[:id])
    @plan = @student.plan
    @degree = @plan.degree
    @term = @plan.graduation_term
    # renders the jbuilder
  end

  def update
    @student = Student.find_by_id(params[:id])
    if @student.update_attributes(student_params)
      render json: @student.as_json(include: :advisor)
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  def create
    @student = Student.new(student_params)
    if @student.save
      render json: @student.as_json(include: :advisor)
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  private
    def student_params
      params.require(:student).permit(:id, :first_name, :last_name, :email, :advisor_id)
    end

end
