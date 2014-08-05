class Photo < ActiveRecord::Base

  has_many :userphotos
  has_many :users, through: :userphotos

end
