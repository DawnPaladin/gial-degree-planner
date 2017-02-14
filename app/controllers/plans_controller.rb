class PlansController < ApplicationController

  def update
    @plan = Plan.find(params[:plan][:id])
    if @plan.update(update_params)
      render json: @plan, status: 200
    end
  end

  private

    def update_params
      params.require(:plan).permit(:graduation_term, :graduation_year)
    end

end
