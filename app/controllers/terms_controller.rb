class TermsController < ApplicationController

  def index
    @terms = Term.includes(:sessions).get_all
    render json: @terms.to_json(include: :sessions)
  end

end
