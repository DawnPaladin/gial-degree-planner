class AdvisorsController < ApplicationController

  def index
    @advisors = Advisor.all
    render json: @advisors, status: 200
  end

end
