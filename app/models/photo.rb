class Photo < ActiveRecord::Base

  has_many :user_photos
  has_many :users, through: :user_photos

end
