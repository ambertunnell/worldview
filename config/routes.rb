Rails.application.routes.draw do

  root 'users#show'

  delete '/articles' => 'articles#destroy'
  delete '/photos' => 'photos#destroy'

  get '/users/signed_in' 

  get '/twitter' =>'tweets#twitter_update'
  get '/auth/twitter', as: 'twitter_login'
  get '/auth/twitter/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

  resources :users, :only => [:show]
  resources :articles, :only => [:create, :index]
  resources :photos, :only => [:create, :index]
  resources :tweets, :only => [:create, :index]

end