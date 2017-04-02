class PlansController < ApplicationController


  def show
    @plan = Student.includes(plan: [:intended_courses, :completed_courses, { required_courses: [:terms, :sessions]}, :scheduled_classes, { concentration: [ { categories: { courses: [:terms, :sessions]}}, :thesis_track, :non_thesis_track]}, :electives]).find(params[:student_id]).plan
  end

  def update
    @plan = Plan.find(params[:plan][:id])
    completed_course = Course.find_by_id(params[:completed_id])
    intended_course = Course.find_by_id(params[:intended_id])
    @plan.add_or_remove_courses(completed: completed_course, intended: intended_course)
    if @plan.update_attributes(plan_params)
      render :show, status: 200
    end
  end

  def enroll_in_meeting
    @course = Course.find(params[:course_id])
    @year = Year.find(params[:meeting_year])
    @term = Term.find(params[:meeting_term])

    # if @course.name == "Thesis Writing" || @course.name == "Thesis"
    #   @meeting = Meeting.find_meeting(@course, @year, @term)
    #   if @meeting.nil?
    #     @meeting = Meeting.create(course_id: @course.id, year: @year.value, term: @term.name)
    #   end
    # else
    #   @meeting = Meeting.find_meeting(@course, @year, @term)
    # end

    # I have replaced the above commented code with this.
    @meeting = Meeting.find_or_create_by({
      course_id: @course.id, year: @year.value, term: @term.name   
    })

    @plan = Plan.find(params[:plan][:id])
    @enrollment = Enrollment.find_or_initialize_by({meeting_id: @meeting.id, plan_id: @plan.id})
    if @enrollment.save
      if params[:prevTerm] && params[:prevYear] && (params[:prevYear] != params[:meeting_year] || params[:prevTerm] != params[:meeting_term])
        prev_year = Year.find(params[:prevYear])
        prev_term = Term.find(params[:prevTerm])
        prev_meeting = Meeting.find_meeting(@course, prev_year, prev_term)
        Enrollment.find_by({meeting_id: prev_meeting.id, plan_id: @plan.id}).delete
      end
      render :show
    else
      render :show
    end
  end

  def disenroll_from_meeting
    @course = Course.find(params[:course_id])
    @year = Year.find(params[:prevYear])
    @term = Term.find(params[:prevTerm])
    @meeting = Meeting.find_meeting(@course, @year, @term)
    @plan = Plan.find(params[:plan][:id])
    @enrollment = Enrollment.find_by({meeting_id: @meeting.id, plan_id: @plan.id})
    @enrollment.delete
    render :show
  end

  private

    def plan_params
      params.require(:plan).permit(:graduation_term, :graduation_year, :concentration_id, :latest_registered, :registration_date)
    end

end
