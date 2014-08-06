class Article < ActiveRecord::Base

  has_many :user_articles
  has_many :users, through: :user_articles
  
end
