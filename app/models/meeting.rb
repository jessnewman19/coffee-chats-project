class Meeting < ApplicationRecord
  belongs_to :user
  belongs_to :professional

  validates :meeting_date, presence: true
  validates :meeting_time, presence: true
end
