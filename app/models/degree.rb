class Degree < ApplicationRecord

  has_many :concentrations

  has_many :degree_course_requirements, dependent: :destroy
  has_many :required_courses, through: :degree_course_requirements, source: :course

  has_many :plans

end
