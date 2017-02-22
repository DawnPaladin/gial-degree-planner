class MeetingsController < ApplicationController

  before_action :set_meeting, only: [:show, :update]

  def show
  end

  def update
    if @meeting.update_attributes(meeting_params)
      render :show
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  private

    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    def meeting_params
      params.permit(:teaching_style, :canceled, teachers_attributes: [ :first_name, :last_name, :title, :id ] )
    end

end