class Professional < ApplicationRecord
  belongs_to :industry
  has_many :meetings 
  has_many :users, through: :meetings
end
