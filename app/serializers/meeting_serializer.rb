class MeetingSerializer < ActiveModel::Serializer
  attributes :meeting_date, :meeting_time
  has_one :user
  has_one :professional
  
end
