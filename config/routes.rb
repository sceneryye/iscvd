RailsOnForum::Application.routes.draw do

  get 'admin' => 'admin/sessions#new'

  namespace :admin do

    # subdomain = nil
    # subdomain = "www" if Rails.env == "production"
    # constraints :subdomain => subdomain do
    get 'logout' => 'sessions#destroy'

    resources :reports
    resources :meetings
    resources :meeting_attendees, only:[:index,:show]
    resources :pages
    resources :page_categories, only: [:index,:new,:create,:edit,:update,:destory]
    resources :users
    resources :emails
    resource :session, only: :create
    resources :donates, only:[:index,:show]
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
  resources :donates, only:[:index,:show,:new,:create]
  resources :meetings, only: [:index,:show]
  resources :pages, only: [:show] do
    collection do
      get 'news'
    end
  end

  

  root 'home#index'
end
