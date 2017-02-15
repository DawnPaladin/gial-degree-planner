class TermsController < ApplicationController

  def index
    @terms = Term.get_all
    render json: @terms.to_json(include: :sessions)
  end

end
