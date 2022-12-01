class Professional < ApplicationRecord
  has_secure_password

  has_one_attached :image
  
  belongs_to :industry
  has_many :meetings 
  has_many :users, through: :meetings

  validates :full_name, presence: true
  validates :username, presence: true
  validates :bio, presence: true

end
