class UsersController < ApplicationController

  def update
    @user = User.find_by(id: session[:user_id])
  end

  def show
    if session[:user_id] && !User.all.empty?
      @user = User.find(session[:user_id]) 
    else
      session[:user_id] = nil
      @user = User.new
    end
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :uid)
    end

end