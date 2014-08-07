class TweetsController < ApplicationController

  def twitter_update
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
    end
    render :json => @client.search("##{params[:location]} -rt", :result_type => "popular", :lang => "en" ).take(10).collect.to_json
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

  private

  def tweet_params
    params.require(:tweet).permit(:data)
  end  

end
