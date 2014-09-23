class CitiesController < ApplicationController

  def create

    @user = User.find(session[:user_id]) if session[:user_id]
    # binding.pry
    @city = City.find_or_create_by(lat: city_params[:lat], lon: city_params[:lon]) do |city| 
      city.name = city_params[:name] 
      # binding.pry
      city.bigger_thing = city_params[:bigger_thing] 
      # binding.pry
      city.country = city_params[:country] 
      # binding.pry
    end

    if !@user
      # binding.pry
      render json: @city

    else 
      unless @user.cities.find_by(lat: city_params[:lat], lon: city_params[:lon])
        # binding.pry
        @user.cities << @city if @user
        del_city_id = city_params[:lastClock].to_i
        CityUser.find_by(user_id: @user.id, city_id: del_city_id).destroy if @user
        render json: @city
      else
        render json: "this city already exists".to_json
      end
    end
      
  end

  def get_city
    @user = User.find(session[:user_id]) if session[:user_id] 
    if @user != nil
      @user_info = { 
          articles: user_articles(current_user),
          photos: user_photos(current_user),
          tweets: user_tweets(current_user)
        }
    else @user_info = []

    end

    @city = City.find(params[:id])
    response = {
      city: @city,
      user_vars: @user_info
    }
    render json: response.to_json
  end

  private

  def city_params
    params.require(:city).permit(:name, :id, :bigger_thing, :lat, :lon, :country, :lastClock)
  end 

end
