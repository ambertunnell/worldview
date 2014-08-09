require 'open-uri'
require 'json'

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


  def flickr
      search = params[:search]
      api_key = "d88f34c6825ef1746df9f258a7990787"
      source = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + api_key + "&format=json&nojsoncallback=1&tags=" + search + "&sort=recent-desc&sort=interestingness-desc&safe_search=1"
      @images = JSON.load(open(source))

     respond_to do |format| 
        if @images != {}
          format.json { render json: @images}
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
