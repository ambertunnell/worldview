class UsersController < ApplicationController
 
  def update
    @user = User.find_by(id: session[:user_id])
  end

  def show
    @city = City.new
    if session[:user_id] && !User.all.empty?
      @user = User.find(session[:user_id]) 
    else
      session[:user_id] = nil
      @user = User.new
    end

    @articles = @user.articles
  end

  def get_cities
    @user = User.find(session[:user_id]) if session[:user_id] 
    if @user != nil
      render json: @user.cities.all.to_json 
    else
      render json: [City.find(1), City.find(2), City.find(3), City.find(4), City.find(5)].to_json
    end
  end

  def signed_in
    @user = User.find(session[:user_id]) if session[:user_id] 
    if session[:user_id] && @user.provider != "anon" # check for anon to see if they are just a temporary user
      @user_info = {
        signed_in: true,
        articles: user_articles(current_user),
        photos: user_photos(current_user),
        tweets: user_tweets(current_user)
      }
      render json: @user_info
    else

    @user_info = {
        signed_in: false
      }
      render json: @user_info
    end 
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :uid, :image)
    end

end