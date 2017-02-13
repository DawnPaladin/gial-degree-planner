class ConcentrationsController < ApplicationController
# TODO see if necessary
def index
  @concentrations = Concentration.all
  render json: @concentrations, status: 200
end

end
