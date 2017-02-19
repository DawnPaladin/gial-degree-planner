class ElectivesController < ApplicationController

  before_action :set_elective, only: [:update, :destroy]

  def create
    @elective = Elective.new(elective_params)
    if @elective.save
      render json: @elective
    else
      render json: { errors: @elective.errors.full_messages, status: 422 }
    end
  end

  def update
    if @elective.update_attributes(elective_params)
      render json: @elective
    else
      render json: { errors: @elective.errors.full_messages, status: 422 }
    end
  end

  def destroy
    @elective.delete
    render json: @elective
  end

  private

    def elective_params
      params.require(:elective)
        .permit(:course_id, :plan_id, :category_name, :intended, :completed)
    end

    def set_elective
      @elective = Elective.find(params[:id])
    end


end