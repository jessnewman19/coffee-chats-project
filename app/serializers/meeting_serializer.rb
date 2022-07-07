class MeetingSerializer < ActiveModel::Serializer
  attributes :id, :meeting
  has_one :user
  has_one :professional
  
end
