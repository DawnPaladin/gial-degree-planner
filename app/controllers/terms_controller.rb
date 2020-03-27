class TermsController < ApplicationController

  def index
    @terms = Term.all
    render json: @terms.to_json()
  end

end
