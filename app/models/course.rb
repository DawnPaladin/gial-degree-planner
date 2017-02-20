class Course < ApplicationRecord
  # validations

  # associations
  has_many :completed_courses_plans
  has_many :intended_courses_plans

  has_many :categories_courses, dependent: :destroy
  has_many :categories, through: :categories_courses

  has_many :prerequisites, class_name: 'CoursePrerequisite',
           foreign_key: :requiring_course, dependent: :destroy
  has_many :required_courses, through: :prerequisites,
           foreign_key: :requiring_course

  has_many :requirings, class_name: 'CoursePrerequisite',
           foreign_key: :required_course, dependent: :destroy
  has_many :requiring_courses, through: :requirings,
           foreign_key: :required_course, source: :requiring_course

  has_many :foreign_course_prerequisites
  has_many :foreign_courses, through: :foreign_course_prerequisites

  has_many :teacher_permissions, dependent: :destroy
  has_many :permitting_teachers, through: :teacher_permissions, source: :teacher

  has_many :courses_sessions, dependent: :destroy
  has_many :sessions, through: :courses_sessions

  has_many :degree_course_requirements, dependent: :destroy
  has_many :requiring_degrees, through: :degree_course_requirements, source: :degree

  has_many :electives
  has_many :electing_plans, through: :electives, source: :plan

  has_many :meetings

  belongs_to :term

  #####
  # Class Methods
  #####
  def self.thesis_writing
    any_term = Term.find_by_name('Any')
    self.find_or_create_by({
      name: "Thesis Writing",
      number: 'AA5190',
      description: 'Writing course required for thesis track',
      units: 1,
      level: 'graduate',
      term_id: any_term.id
    })
  end

  def self.thesis_course
    any_term = Term.find_by_name('Any')
    self.find_or_create_by({
      name: "Thesis",
      number: 'AA5191',
      description: 'Thesis Course',
      units: 1,
      level: 'graduate',
      term_id: any_term.id
    })
  end


  #####
  # Instance Methods
  #####

  # this will probably need work
  # to determine the correct year/term
  def create_meetings(num = 10)
    num.times do |num|
      current_year = Date.today.year

      session = self.sessions.first

      self.meetings.create({
        year: Date.new(current_year).advance(years: num).year,
        term: self.term.name,
        session: session.nil? ? "1" : session.name,
      })
    end
  end



end
