RailsOnForum::Application.routes.draw do

  namespace :admin do
    resources :reports
    get 'send_group_emails', to: 'reports#send_group_emails', as: :send_group_emails
  end

  post '/send_emails', to: 'users#send_emails', as: :send_emails
  mount Ckeditor::Engine => '/ckeditor'
  
  get    '/login',     to: 'sessions#new',     as: :login
  delete '/logout', to: 'sessions#destroy', as: :logout
  resource  :session, only: :create

  resource :search


  resources :users,   only: [:create, :update, :destroy] do
     resources :user_instetests
  end


  get '/register',    to: 'users#new',  as: :register
  get '/:id',         to: 'users#show', as: :profile
  get '/:id/edit', to: 'users#edit', as: :edit_profile
  

  resource :home, only: [:index]

  root 'home#index'
end
