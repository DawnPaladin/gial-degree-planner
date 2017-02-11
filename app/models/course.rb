class Course < ApplicationRecord
  # validations

  # associations
  has_many :completed_courses_plans
  has_many :intended_courses_plans

  has_many :categories_courses
  has_many :categories, through: :categories_courses

  has_many :course_prerequisites
  has_many :prerequisites, through: :course_prerequisites,
           foreign_key: :requiring_course, source: :requiring_course
  has_many :requiring_courses, through: :course_prerequisites,
           foreign_key: :required_course

  has_many :foreign_course_prequisites
  has_many :foreign_courses, through: :foreign_course_prequisites

  has_many :teacher_permissions
  has_many :permitting_teachers, through: :teacher_permissions, source: :teacher

  has_many :courses_sessions
  has_many :sessions, through: :courses_sessions

  has_many :degree_course_requirements
  has_many :requiring_degrees, through: :degree_course_requirements, source: :degree

  has_many :meetings

  belongs_to :thesis_track
  belongs_to :non_thesis_track
  belongs_to :term
end
