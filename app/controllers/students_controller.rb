class StudentsController < ApplicationController

  def index
    @students = Student.all
    render json: @students, status: 200
  end

  def show
    @student = Student.find(params[:id])
    @plan = @student.plan
    @degree = @plan.degree
    @term = @plan.graduation_term
    # renders the jbuilder
  end

end
