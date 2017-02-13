class TransferredUnit < ApplicationRecord
  # validations

  # associations
  belongs_to :plan
  belongs_to :foreign_course
end
