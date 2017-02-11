class Meeting < ApplicationRecord
  # validations

  # associations
  has_many :enrollments
  has_many :plans, through: :enrollments

  has_many :meetings_teachers
  has_many :teachers, through: :meetings_teachers

  belongs_to :course
end
