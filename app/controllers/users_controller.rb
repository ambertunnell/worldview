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
    #binding.pry
    @user = User.find(session[:user_id]) if session[:user_id] 
    if @user != nil
      render json: @user.cities.all.to_json 
    else
      render json: City.all[0..4].to_json 
    end
  end

  def signed_in
    if session[:user_id]
      render json: "true"
    else
      render json: "false"
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