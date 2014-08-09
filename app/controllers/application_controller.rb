class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_cities

  helper_method def logged_in?
    !!current_user #double negation to convert to boolean
  end

  helper_method def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id] #memoized
  end

  def set_cities
    @cities = City.all
  end
  
end
