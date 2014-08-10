class UsersController < ApplicationController
  # before_create :set_default_cities
  
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

  def signed_in
    if session[:user_id]
      render json: "true"
    else
      render json: "false"
    end 
  end

  def set_default_cities
    @user.cities << [@Nyc, @Ldn, @Hk, @Prs, @Syd]
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :uid, :image)
    end

end