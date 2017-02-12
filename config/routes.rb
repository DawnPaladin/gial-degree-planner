Rails.application.routes.draw do
  devise_for :advisors
  get 'angular_app/index'

  scope :api do
    scope :v1 do
      resources :students
      resources :advisors
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'angular_app#index'
  get 'angular_app/index'
end
