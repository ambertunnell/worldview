class PhotosController < ApplicationController

  def create
    @user = User.find(session[:user_id]) if session[:user_id]

    unless @user.photos.find_by(url: params[:photo][:url])
      @photo = Photo.create(photo_params)
      @user.photos << @photo
      @user.save
    end

    respond_to do |format|
      if @user.save
        format.json { render json: @photo }
      else
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end 
  end

   def index
    @user = User.find(session[:user_id]) if session[:user_id]
    @photos = @user.photos.reverse #So that newest are on top of list
    render json: @photos  
  end 

  def destroy
    @user = User.find(session[:user_id]) if session[:user_id]
    photo_url = params[:delete_request][:url]
    if @user.photos.find_by(url: photo_url)
      @photo = @user.photos.find_by(url: photo_url)
      @photo.destroy
      @user.save
    end
    
    respond_to do |format|
      if @user.save
        format.json { render json: @user}
      else
        format.json { head :no_content }
      end
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:title, :url)
  end

end
