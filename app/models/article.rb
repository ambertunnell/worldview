class Article < ActiveRecord::Base

  has_many :userarticles
  has_many :users, through: :userarticles
  
end
