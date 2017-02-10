Rails.application.routes.draw do
  devise_for :advisors
  get 'angular_app/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'angular_app#index'
  get 'angular_app/index'
end
