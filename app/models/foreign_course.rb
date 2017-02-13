class ForeignCourse < ApplicationRecord
  # validations

  # associations
  has_many :transferred_courses
  has_many :plans, through: :transferred_courses

  has_many :foreign_course_prerequisites
  has_many :requiring_courses, through: :foreign_course_prerequisites,
           class_name: 'Course', source: :course
end
