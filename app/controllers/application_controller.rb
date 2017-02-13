class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
    end

  private

    def after_sign_out_path_for(resource_or_scope)
      new_advisor_session_path
    end

    def require_admin
      unless current_advisor.is_admin
        redirect_back(fallback_location: root_path)
      end
    end

    def require_current_advisor
      unless current_advisor.id == params[:id].to_i
        redirect_back(fallback_location: root_path)
      end
    end        

end
