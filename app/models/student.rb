class Student < ApplicationRecord
  # validations

  # associations
  has_one :plan

  has_one :advisor
end
