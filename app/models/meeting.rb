class Meeting < ApplicationRecord
  # validations

  # associations
  has_many :enrollments, dependent: :destroy
  has_many :plans, through: :enrollments
  has_many :enrolled_students, through: :plans, source: :student

  has_many :meetings_teachers, dependent: :destroy
  has_many :teachers, through: :meetings_teachers

  has_many :meetings_sessions, dependent: :destroy
  has_many :sessions, through: :meetings_sessions

  belongs_to :course

  def self.find_meeting(year, term, session)
    Meeting.where(year: year, term: term.name, session: session.name).first
  end

end
