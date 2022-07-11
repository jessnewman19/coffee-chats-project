class Meeting < ApplicationRecord
  belongs_to :user
  belongs_to :professional
  has_many :meeting_applications

end
