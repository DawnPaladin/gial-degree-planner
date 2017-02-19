class ElectivesController < ApplicationController

  def create
    @elective = Elective.new(elective_params)
    if @elective.save
      render json: @elective
    else
      render json: { errors: @elective.errors.full_messages, status: 422 }
    end
  end

  def update
    @elective = Elective.find(params[:id])
    if @elective.update_attributes(elective_params)
      render json: @elective
    else
      render json: { errors: @elective.errors.full_messages, status: 422 }
    end
  end

  private

    def elective_params
      params.require(:elective)
        .permit(:course_id, :plan_id, :category_name, :intended, :completed)
    end


end