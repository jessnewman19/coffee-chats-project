class MeetingApplicationSerializer < ActiveModel::Serializer
  attributes :id, :is_approved
  has_one :meeting
  has_one :user
end
