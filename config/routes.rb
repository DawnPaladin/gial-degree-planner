Rails.application.routes.draw do

  devise_for :advisors, controllers: { sessions: 'advisors/sessions', registrations: 'advisors/registrations'}

  devise_scope :advisor do
    get 'advisors/sign_out', to: 'advisors/sessions#destroy'
  end

  scope :api do
    scope :v1 do
      resources :students
      resources :advisors
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'angular_app#index'

  get 'angular_app/index'

  resources :advisors, only: [:index, :update, :destroy]

end
