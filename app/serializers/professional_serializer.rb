class ProfessionalSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :image_url, :bio, :linkedin
  has_one :industry

end
