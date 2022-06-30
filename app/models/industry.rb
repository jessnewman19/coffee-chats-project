class Industry < ApplicationRecord
    has_many :users 
    has_many :professionals
end
