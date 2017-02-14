class PlansController < ApplicationController


  def show
    @plan = Student.find(params[:student_id]).plan
    render json: @plan.to_json(include: [:intended_courses, :completed_courses])
  end

  def update
    @plan = Plan.find(params[:plan][:id])
    if @plan.update(plan_params)
      render json: @plan, status: 200
    end
  end

  private

    def plan_params
      params.require(:plan).permit(:graduation_term, :graduation_year, :concentration_id, :latest_registered, :registration_date)
    end

end
