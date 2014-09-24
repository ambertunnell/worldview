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
      #binding.pry
      @user = User.create(name: 'Guest', provider: 'anon', uid: session[:session_id], image: 'https://origin.ih.constantcontact.com/fs197/1110193228531/img/301.jpg?a=1115291249439')
      @user.cities << [City.find(1), City.find(2), City.find(3), City.find(4), City.find(5)]
      session[:user_id] = @user.id
    end
     
    unless @user.cities.find_by(lat: city_params[:lat], lon: city_params[:lon])
      # binding.pry
      @user.cities << @city if @user
      del_city_id = city_params[:lastClock].to_i
     # binding.pry
      CityUser.find_by(user_id: @user.id, city_id: del_city_id).destroy if @user
      render json: @city
    else
      render json: "this city already exists".to_json
    end
    
      
  end

  def get_city
    @user = User.find(session[:user_id]) if session[:user_id] 
    
    if @user != nil && @user.provider != "anon"
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
