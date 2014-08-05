class Tweet < ActiveRecord::Base

  has_many :usertweets
  has_many :users, through: :usertweets

end
