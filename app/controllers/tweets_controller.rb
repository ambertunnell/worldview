class TweetsController < ApplicationController

  def twitter_update
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
      config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
    end
    # binding.pry
    render :json => @client.search("##{params[:location]} -rt", :result_type => "popular", :lang => "en" ).take(10).collect.to_json
  end

end
