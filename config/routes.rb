Rails.application.routes.draw do

  post '/cities/get_city' => 'cities#get_city'

  get '/users/get_cities' => 'users#get_cities'
  
  resources :cities

  root 'users#show'

  delete '/articles' => 'articles#destroy'
  delete '/photos' => 'photos#destroy'
  delete '/tweets' => 'tweets#destroy'

  get '/users/signed_in' 

  get '/autocomplete/countries' => 'autocomplete#show'

  get '/photos/flickr'
  get '/twitter' =>'tweets#twitter_update'
  get '/auth/twitter', as: 'twitter_login'
  get '/auth/twitter/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

  resources :users, :only => [:show]
  resources :articles, :only => [:create, :index]
  resources :photos, :only => [:create, :index]
  resources :tweets, :only => [:create, :index]

end