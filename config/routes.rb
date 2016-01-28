RailsOnForum::Application.routes.draw do

  namespace :admin do
    resources :reports
    get '/users_list', to: 'reports#users_list'
    get '/groupbuys_list', to: 'reports#groupbuys_list'
    get '/topics_list', to: 'reports#topics_list'
    get '/participants_list', to: 'reports#participants_list'
    get '/tags_list', to: 'reports#tags_list'
  end


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
