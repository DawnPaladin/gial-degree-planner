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

        # TODO Refactor
        put 'enroll_in_meeting', to: 'plans#enroll_in_meeting'
        put 'disenroll_from_meeting', to: 'plans#disenroll_from_meeting'
      end
      resources :electives, only: [:create, :update, :destroy]
      resources :advisors
      resources :concentrations, only: [:index, :create, :show, :update, :delete]
      resources :terms, only: [:index]
      resources :degrees, only: [:index, :show, :update, :delete]
      resources :courses, only: [:index, :create, :show]
      resources :sessions, only: [:index]
      resources :meetings, only: [:show, :update, :destroy]

    end
  end

  root 'angular_app#index'

  get 'angular_app/index'

end
