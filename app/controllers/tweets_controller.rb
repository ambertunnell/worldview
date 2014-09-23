class TweetsController < ApplicationController

  def twitter_update
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
    end
    
    @city = City.find(params[:location])
    tweets = []

    if @city.name.split(" ").length > 2
       cityShort = @city.name.split(" ")[0] + @city.name.split(" ")[1]  
    end
    cityLong = @city.name.gsub(/ /,"")
    bigthingLong = @city.bigger_thing.gsub(/ /,"")
    # binding.pry;
    tweets.push(@client.search("##{cityLong} -rt", :result_type => "popular", :lang => "en" ).take(12)).flatten!
    if tweets.length <12 && cityShort !=nil
      tweets.push(@client.search("##{cityShort} -rt", :result_type => "popular", :lang => "en" ).take(12)).flatten!
    end
    if tweets.length <12
      tweets.push(@client.search("##{bigthingLong} -rt", :result_type => "popular", :lang => "en" ).take(12)).flatten!
    end
    
    render :json => tweets.take(12).to_json
    
  end


  def create
    @user = User.find(session[:user_id]) if session[:user_id]
    
    unless @user.tweets.find_by(data: params[:tweet][:data])
      @tweet = Tweet.create(tweet_params) 
      @user.tweets << @tweet
      @user.save
    end
   
    respond_to do |format|
      if @user.save
        format.json { render json: @tweet }
      else
        format.json { render json: @tweet.errors, status: :unprocessable_entity }
      end
    end
  end

  def index
    @user = User.find(session[:user_id]) if session[:user_id]
    @tweets = @user.tweets.reverse #So that newest are on top of list
    render json: @tweets  
  end 

  def destroy
    @user = User.find(session[:user_id]) if session[:user_id]
    tweet_data = params[:delete_request][:data]
    if @user.tweets.find_by(data: tweet_data)
      @tweet = @user.tweets.find_by(data: tweet_data)
      @tweet.destroy
      @user.save
    end
    
    respond_to do |format|
      if @user.save
        format.json { render json: user_tweets(@user)}
      else
        format.json { head :no_content }
      end
    end
  end

  private

  def tweet_params
    params.require(:tweet).permit(:data, :uid)
  end  

end
