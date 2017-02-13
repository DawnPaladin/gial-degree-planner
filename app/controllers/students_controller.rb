class StudentsController < ApplicationController

  def index
    @students = Student.all
    render json: @students, status: 200
  end

  def show
    @student = Student.find(params[:id])
    render json: @student, status: 200
  end

end
