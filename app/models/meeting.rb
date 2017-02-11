class Meeting < ApplicationRecord
  # validations

  # associations
  has_many :enrollments, dependent: :destroy
  has_many :plans, through: :enrollments

  has_many :meetings_teachers, dependent: :destroy
  has_many :teachers, through: :meetings_teachers

  belongs_to :course
end
