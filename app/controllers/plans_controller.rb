class PlansController < ApplicationController

  def show
    @plan = Student.find(params[:student_id]).plan
    render json: @plan
  end

end