class User < ActiveRecord::Base

  has_many :user_articles
  has_many :articles, through: :user_articles
  has_many :user_tweets
  has_many :tweets, through: :user_tweets
  has_many :user_photos
  has_many :photos, through: :user_photos
  has_many :city_users
  has_many :cities, through: :city_users
  
  def self.create_from_omniauth(auth_hash)
    self.create(
      provider: auth_hash[:provider],
      uid: auth_hash[:uid],
      name: auth_hash[:info][:name],
      image: auth_hash[:info][:image].gsub("_normal","")
    )
  end

  def first_name
    self.name.split(" ")[0]
  end 

  def anonymous?
    self.provider == "anon"
  end 

end
