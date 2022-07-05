class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :full_name, :username, :image, :bio, :id
  has_one :industry

  def image 
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

end
