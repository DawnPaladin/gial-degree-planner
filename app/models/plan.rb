class Plan < ApplicationRecord
  # validations

  # associations
  belongs_to :student
  belongs_to :concentration, optional: true

  has_many :transferred_courses
  has_many :foreign_courses, through: :transferred_courses

  has_many :completed_courses_plans
  has_many :completed_courses, through: :completed_courses_plans

  has_many :intended_courses_plans
  has_many :intended_courses, through: :intended_courses_plans

  has_many :enrollments
  has_many :scheduled_classes, through: :enrollments,
           class_name: 'Meeting'

  belongs_to :degree

  def courses
    self.completed_courses + self.intended_courses
  end

  def thesis_starts
    self.scheduled_classes.merge(Course.thesis_writing.meetings).first.friendly_date
  end

end
