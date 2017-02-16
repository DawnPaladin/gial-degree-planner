class PlansController < ApplicationController


  def show
    @plan = Student.find(params[:student_id]).plan
    # render json: @plan.to_json(include: [:intended_courses, :completed_courses, :required_courses])
  end

  def update
    @plan = Plan.find(params[:plan][:id])
    completed_course = Course.find_by_id(params[:completed_id])
    intended_course = Course.find_by_id(params[:intended_id])
    @plan.add_or_remove_courses(completed: completed_course, intended: intended_course)
    if @plan.update(plan_params)
      render :show, status: 200
    end
  end

  private

    def plan_params
      params.require(:plan).permit(:graduation_term, :graduation_year, :concentration_id, :latest_registered, :registration_date)
    end

end
