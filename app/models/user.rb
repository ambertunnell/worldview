class User < ActiveRecord::Base

  has_many :articleusers
  has_many :articles, through: :userarticles
  has_many :usertweets
  has_many :tweets, through: :usertweets
  has_many :userpictures
  has_many :pictures, through: :userpictures

  def self.create_from_omniauth(auth_hash)
    self.create(
      provider: auth_hash[:provider],
      uid: auth_hash[:uid],
      name: auth_hash[:info][:name]
    )
  end
  

end
