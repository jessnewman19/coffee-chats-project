class UserSerializer < ActiveModel::Serializer
  attributes :full_name, :username, :image_url, :bio
  has_one :industry
  
end
