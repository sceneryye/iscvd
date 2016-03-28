RailsOnForum::Application.routes.draw do

 get 'admin'=>'admin/sessions#new'

  namespace :admin do

    # subdomain = nil
    # subdomain = "www" if Rails.env == "production"
    # constraints :subdomain => subdomain do
    get 'logout'=>'sessions#destroy'
   
    resources :reports
    resources :emails
    resources :sessions
    get 'send_group_emails', to: 'reports#send_group_emails', as: :send_group_emails
  end

  post '/send_emails', to: 'users#send_emails', as: :send_emails
  mount Ckeditor::Engine => '/ckeditor'
  
  get    '/login',     to: 'sessions#new',     as: :login
  delete '/logout', to: 'sessions#destroy', as: :logout
  resource  :session, only: :create

  resource :search


  resources :users,   only: [:create, :update, :destroy] 


  get '/register',    to: 'users#new',  as: :register
  get '/:id',         to: 'users#show', as: :profile
  get '/:id/edit', to: 'users#edit', as: :edit_profile
  

  resource :home, only: [:index]

  root 'home#index'
end
