class MeetingSerializer < ActiveModel::Serializer
  attributes :id, :meeting_date, :meeting_time, :is_approved
  has_one :user
  has_one :professional
  
end
