class Plan < ApplicationRecord
  # validations

  # associations
  belongs_to :student
  belongs_to :concentration, optional: true

  has_many :transferred_units
  has_many :foreign_courses, through: :transferred_units

  has_many :completed_courses_plans
  has_many :completed_courses, through: :completed_courses_plans

  has_many :intended_courses_plans
  has_many :intended_courses, through: :intended_courses_plans
  
  has_many :enrollments
  has_many :scheduled_classes, through: :enrollments,
           class_name: 'Meeting'

end
