class PlansController < ApplicationController


  def show
    @plan = Student.find(params[:student_id]).plan
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

  def update_schedule
    @plan = Plan.find(params[:id])
    @term = Term.find(params[:meeting_term])
    @session = Session.find(params[:meeting_session])
    @meeting = Meeting.find_meeting(params[:meeting_year], @term, @session)
    @plan.scheduled_classes << @meeting
    render json: @plan, status: 200
  end

  private

    def plan_params
      params.require(:plan).permit(:graduation_term, :graduation_year, :concentration_id, :latest_registered, :registration_date)
    end

end
