class SessionsController < ApplicationController
  
  # DEPRECATED
  # Sessions are no longer used. Feel free to remove them anywhere they get in the way.

  def index
    @sessions = Session.all
    render json: @sessions
  end

end
