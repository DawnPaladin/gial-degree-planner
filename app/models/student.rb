class Student < ApplicationRecord
  # validations

  # associations
  has_one :plan

  belongs_to :advisor
end
