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
      del_city_id = city_params[:lastClock].to_i
      CityUser.find_by(user_id: @user.id, city_id: del_city_id).destroy
      # binding.pry      
      render json: @city
    else
      # binding.pry
      render json: "this city already exists".to_json
    end
      
      #  Should and this to solve race condition error
      #  begin
      #   CreditAccount.find_or_create_by(user_id: user.id)
      # rescue ActiveRecord::RecordNotUnique
      #   retry
      # end
 
    # respond_to do |format|
    #   if @user.save
    #     format.json { render json: @city }
    #   else
    #     format.json { head :no_content }
    #   end
    # end
  end

  def get_city
    @city = City.find(params[:id])
    render json: @city.to_json
  end

  private

  def city_params
    params.require(:city).permit(:name, :id, :bigger_thing, :lat, :lon, :country, :lastClock)
  end 

end
