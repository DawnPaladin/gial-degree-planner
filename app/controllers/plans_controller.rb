class PlansController < ApplicationController


  def show
    @plan = Student.find(params[:student_id]).plan
    render json: @plan
  end

  def update
    @plan = Plan.find(params[:plan][:id])
    if @plan.update(plan_params)
      render json: @plan, status: 200
    end
  end

  private

    def plan_params
      params.require(:plan).permit(:graduation_term, :graduation_year, :concentration_id)
    end

end
