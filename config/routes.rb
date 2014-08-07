Rails.application.routes.draw do
  
  resources :users, :only => [:show]
  resources :articles, :only => [:create, :index]
  resources :photos, :only => [:create, :index]
  resources :tweets, :only => [:create, :index]

  root 'users#show'

  get '/twitter' =>'tweets#twitter_update'
  get '/auth/twitter', as: 'twitter_login'
  get '/auth/twitter/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

end