class SessionsController < ApplicationController

  def new
    redirect_to '/auth/twitter'
  end

  def create
    #binding.pry
    if auth_hash.present?
      if !@user = User.find_by_provider_and_uid(auth_hash[:provider], auth_hash[:uid])
        if session[:user_id] #ie if was a temp user & this is first time authing with twitter 
          #then replace their temp account uid and provider with this new auth hash info. The session will only have a user_id for a temp user or for someone already logged in. If already logged in then would never end up in this create method so this should only catch temp users who log in for first time
         
          @user = User.find(session[:user_id])
          
          @user.uid = auth_hash[:uid]
          @user.provider = auth_hash[:provider]
          @user.name = auth_hash[:info][:name]
          @user.image = auth_hash[:info][:image]
          @user.save
        else
          @user = User.create_from_omniauth(auth_hash)
          @user.cities << [City.find(1), City.find(2), City.find(3), City.find(4), City.find(5)]
        end
      end

      if @user
        session[:user_id] = @user.id
        redirect_to root_url
      else
        redirect_to root_url
      end
    else
      redirect_to root_url, :notice => "Please login via twitter"
    end
  end

  def destroy
    reset_session
    redirect_to root_url
  end

  protected
  
  def auth_hash
    request.env['omniauth.auth']
  end

end

