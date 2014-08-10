class CitiesController < ApplicationController

  def create
    binding.pry
    @user = User.find(session[:user_id]) if session[:user_id]
    @city = City.find_or_create_by(lat: city_params[:lat], lon: city_params[:lon]) do |city| 
      city.name = city_params[:name] 
      city.bigger_thing = city_params[:bigger_thing] 
      city.country = city_params[:country] 
    end
      
      #  Should and this to solve race condition error
      #  begin
      #   CreditAccount.find_or_create_by(user_id: user.id)
      # rescue ActiveRecord::RecordNotUnique
      #   retry
      # end
    
  #   unless @user.articles.find_by(title: params[:article][:title])
  #     @article = Article.create(article_params) 
  #     @user.articles << @article
  #     @user.save
  #   # check if the input is 
  end

# {"city"=>{"name"=>"Boston", "bigger_thing"=>"Massachusetts", "lat"=>"42.370468", "lon"=>"-71.027473", "country"=>"US"}, "action"=>"create", "controller"=>"cities"}
  def city_params
    params.require(:city).permit(:name, :bigger_thing, :lat, :lon, :country)
  end 

end
