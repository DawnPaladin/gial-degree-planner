Rails.application.routes.draw do

  devise_for :advisors, controllers: { sessions: 'advisors/sessions', registrations: 'advisors/registrations'}

  devise_scope :advisor do
    get 'advisors/sign_out', to: 'advisors/sessions#destroy'
  end

  scope :api do
    scope :v1 do
      resources :students
      resources :advisors
      resources :concentrations, only: [:index]
    end
  end

  root 'angular_app#index'

  get 'angular_app/index'

  resources :advisors, only: [:index, :update, :destroy]

end
