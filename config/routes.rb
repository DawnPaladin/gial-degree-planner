Rails.application.routes.draw do
  devise_for :advisors, controllers: { sessions: 'advisors/sessions', registrations: 'advisors/registrations'}

  root 'angular_app#index'
  get 'angular_app/index'
end
