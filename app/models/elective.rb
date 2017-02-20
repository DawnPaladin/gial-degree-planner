class Elective < ApplicationRecord

  # validations
  validates_presence_of :category_name

  # associations
  belongs_to :plan
  belongs_to :course
end
