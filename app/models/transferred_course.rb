class TransferredCourse < ApplicationRecord
  # validations

  # associations
  belongs_to :plan
  belongs_to :foreign_course
end
