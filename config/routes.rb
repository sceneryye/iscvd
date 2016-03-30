RailsOnForum::Application.routes.draw do

  get 'admin' => 'admin/sessions#new'


#match '/static-events/',     :to => 'static_events#index', :as => :static_events
  namespace :admin do

    # subdomain = nil
    # subdomain = "www" if Rails.env == "production"
    # constraints :subdomain => subdomain do
    get 'logout' => 'sessions#destroy'

    resources :reports
    resources :meetings
    resources :meeting_attendees
    resources :pages
    resources :page_categories
    resources :users
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

  resource :meetings, only: [:index,:show]


  resources :users


  get '/register', to: 'users#new', as: :register


  resource :home, only: [:index]

  resources :pages, only: [:index,:show]

  root 'home#index'
end
