class Meeting < ApplicationRecord
  # validations

  # associations
  has_many :enrollments, dependent: :destroy
  has_many :plans, through: :enrollments
  has_many :enrolled_students, through: :plans, source: :student

  has_many :meetings_teachers, dependent: :destroy
  has_many :teachers, through: :meetings_teachers

  belongs_to :course

  def friendly_date
    if self.term == "ANY"
      self.year.to_s
    else
      self.term.titleize + ' ' + self.year.to_s
    end
  end
end
