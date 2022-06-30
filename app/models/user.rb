class User < ApplicationRecord
  has_secure_password
  
  belongs_to :industry
  has_many :meetings 
  has_many :professionals, through: :meetings

  validates :full_name, presence: true
  validates :username, presence: true, uniqueness: true 
  validates :password, presence: true 
  validates :password_confirmation, presence: true 
  validates :bio, presence: true
end
