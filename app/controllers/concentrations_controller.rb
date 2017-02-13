class ConcentrationsController < ApplicationController

def index
  @concentrations = Concentration.all
  render json: @concentrations, status: 200
end

end
