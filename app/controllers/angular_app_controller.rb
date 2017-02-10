class AngularAppController < ApplicationController

  before_action :authenticate_advisor!

  def index
  end
end
