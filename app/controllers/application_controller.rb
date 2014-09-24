class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_cities

  helper_method def logged_in?
    !!current_user && @current_user.provider != "anon"
  end

  helper_method def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def set_cities
    @cities = City.all
  end

  helper_method def user_articles(user)
    @articles = user.articles.collect { |article| article.url }
  end 

  helper_method def user_photos(user)
    @photos = user.photos.collect { |photo| photo.url }
  end 

  helper_method def user_tweets(user)
    @tweets = user.tweets.collect { |tweet| tweet.uid }
  end 
  
end
