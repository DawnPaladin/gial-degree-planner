class Category < ApplicationRecord
  # validations

  # associations
  has_many :categories_courses, dependent: :destroy
  has_many :courses, through: :categories_courses

  belongs_to :concentration
end
