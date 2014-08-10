class CitiesController < ApplicationController

  def create
    
    @user = User.find(session[:user_id]) if session[:user_id]
    @city = City.find_or_create_by(lat: city_params[:lat], lon: city_params[:lon]) do |city| 
      city.name = city_params[:name] 
      city.bigger_thing = city_params[:bigger_thing] 
      city.country = city_params[:country] 
    end
   
    unless @user.cities.find_by(lat: city_params[:lat], lon: city_params[:lon])
        @user.cities << @city
        
       # del_city_id = City.find_by(city_id: city_params[:lastClock]) 
        #puts "Would delete #{del_city_id}"
        # CityUser.find_by(user_id: @user.id, city_id: del_city_id).destroy
    end
      
      #  Should and this to solve race condition error
      #  begin
      #   CreditAccount.find_or_create_by(user_id: user.id)
      # rescue ActiveRecord::RecordNotUnique
      #   retry
      # end
 
    respond_to do |format|
      if @user.save
        format.json { render json: @city }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end


  end

 

# {"city"=>{"name"=>"Boston", "bigger_thing"=>"Massachusetts", "lat"=>"42.370468", "lon"=>"-71.027473", "country"=>"US"}, "action"=>"create", "controller"=>"cities"}
  def city_params
    params.require(:city).permit(:name, :bigger_thing, :lat, :lon, :country, :lastClock)
  end 

end
