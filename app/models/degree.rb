class Degree < ApplicationRecord

  has_many :concentrations

  has_many :degree_course_requirements
  has_many :required_courses, through: :degree_course_requirements, source: :course

end
