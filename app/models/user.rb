class User < ApplicationRecord
  has_secure_password
  
  #Using Active Storage to upload photos
  has_one_attached :image
  
  belongs_to :industry
  has_many :meetings 
  has_many :professionals, through: :meetings

  validates :full_name, presence: true
  validates :username, presence: true
  validates :bio, presence: true

end
