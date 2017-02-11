Rails.application.routes.draw do
  devise_for :advisors, controllers: { sessions: 'advisors/sessions', registrations: 'advisors/registrations'}

  devise_scope :advisor do
    get 'advisors/sign_out', to: 'advisors/sessions#destroy'
  end

  root 'angular_app#index'

  get 'angular_app/index'

end
