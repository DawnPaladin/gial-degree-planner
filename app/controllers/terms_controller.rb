class TermsController < ApplicationController

  def index
    @terms = Term.includes(:sessions).all
    render json: @terms.to_json(include: :sessions, only: :abbreviation)
  end

end
