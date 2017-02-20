class DegreesController < ApplicationController
  def index
    @degrees = Degree.all
    render json: @degrees.to_json
  end
end
