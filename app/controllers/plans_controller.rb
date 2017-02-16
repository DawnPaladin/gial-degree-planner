class PlansController < ApplicationController


  def show
    @plan = Student.find(params[:student_id]).plan
    render json: @plan.to_json(
      include: { completed_courses: { include: [:term, :sessions] }, intended_courses: { include: [:term, :sessions] } } )
  end

  def update
    @plan = Plan.find(params[:plan][:id])
    if @plan.update(plan_params)
      render json: @plan, status: 200
    end
  end

  def update_schedule
    @plan = Plan.find(params[:id])
    @term = Term.find(params[:meeting_term])
    @session = Session.find(params[:meeting_session])
    binding.pry
    @meeting = Meeting.find_meeting(params[:meeting_year], @term, @session)
    @plan.scheduled_classes << @meeting
    render json: @plan, status: 200
  end

  private

    def plan_params
      params.require(:plan).permit(:graduation_term, :graduation_year, :concentration_id, :latest_registered, :registration_date)
    end

end
