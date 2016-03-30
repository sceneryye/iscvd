RailsOnForum::Application.routes.draw do

  get 'admin' => 'admin/sessions#new'

  namespace :admin do

    # subdomain = nil
    # subdomain = "www" if Rails.env == "production"
    # constraints :subdomain => subdomain do
    get 'logout' => 'sessions#destroy'

    resources :reports
    resources :emails
    resources :sessions, only: [:new]
    get 'send_group_emails', to: 'reports#send_group_emails', as: :send_group_emails
  end

  post '/send_emails', to: 'users#send_emails', as: :send_emails
  mount Ckeditor::Engine => '/ckeditor'

  get '/login', to: 'sessions#new', as: :login
  delete '/logout', to: 'sessions#destroy', as: :logout
  resource :session, only: :create
  resources :account_activations, only: :edit
  resource :search


  resources :users


  get '/register', to: 'users#new', as: :register


  resource :home, only: [:index]

  resource :pages, only: [:index,:show]

  root 'home#index'
end
