class Meeting < ApplicationRecord
  # validations

  # associations
  has_many :enrollments, dependent: :destroy
  has_many :plans, through: :enrollments
  has_many :enrolled_students, through: :plans, source: :student

  has_many :meetings_teachers, dependent: :destroy
  has_many :teachers, through: :meetings_teachers

  belongs_to :course

  def self.find_meeting(course, year, term)
    Meeting.where(course: course, year: year.value, term: term.name).first
  end

end
