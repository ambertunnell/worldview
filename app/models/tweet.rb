class Tweet < ActiveRecord::Base

  has_many :user_tweets
  has_many :users, through: :user_tweets

end
