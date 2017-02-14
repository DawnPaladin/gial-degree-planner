Rails.application.routes.draw do

  devise_for :advisors, controllers: { sessions: 'advisors/sessions', registrations: 'advisors/registrations'}

  devise_scope :advisor do
    get 'advisors/sign_out', to: 'advisors/sessions#destroy'
  end

  resources :advisors, only: [:index, :update, :destroy]

  scope :api do
    scope :v1 do
      resources :students do
        resource :plan
      end
      resources :advisors
      resources :concentrations, only: [:index]
    end
  end

  root 'angular_app#index'

  get 'angular_app/index'



end
