class AdvisorsController < ApplicationController

  before_action :authenticate_advisor!
  before_action :require_admin

  def index
    @advisors = Advisor.all
    respond_to do |format|
      format.html
      format.json { render json: @advisors, status: 200 }
    end
  end

  def update
    @advisor = Advisor.find(params[:id])
    if @advisor.update(update_params)
      flash[:notice] = @advisor.is_admin ? "#{@advisor.name} is now an admin" : "#{@advisor.name} is now an advisor"
      redirect_back(fallback_location: advisors_path)
    else
      flash[:notice] = @advisor.errors.full_messages
      redirect_back(fallback_location: advisors_path)
    end
  end

  def destroy
    @advisor = Advisor.find(params[:id])
    unless @advisor == current_advisor
      @advisor.destroy
      flash[:notice] = "Advisor deleted"
      redirect_back(fallback_location: advisors_path)
    end
  end

  private

    def update_params
      params.require(:advisor).permit(:is_admin)
    end
end
