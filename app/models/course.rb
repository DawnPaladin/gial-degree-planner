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

  has_many :meetings, dependent: :destroy

  has_many :courses_terms
  has_many :terms, through: :courses_terms

  # lifecycle
  before_save :upcase_number
  after_create :create_meetings
  after_update :update_meetings

  #####
  # Class Methods
  #####
  def self.thesis_writing
    course = self.find_or_create_by({
      name: "Thesis Writing",
      number: 'AA5190',
      description: 'Writing course required for thesis track',
      units: 1,
      level: 'graduate',
    })
    any_term = Term.find_by_name('Any')
    course.terms << any_term unless course.terms.include? any_term
    course
  end

  def self.thesis_course
    course = self.find_or_create_by({
      name: "Thesis",
      number: 'AA5191',
      description: 'Thesis Course',
      units: 1,
      level: 'graduate',
    })
    any_term = Term.find_by_name('Any')
    course.terms << any_term unless course.terms.include? any_term
    course
  end


  #####
  # Instance Methods
  #####

  def full_name
    "#{self.number} #{self.name}"
  end

  def enrolled_students
    enrollments = []
    self.meetings.includes(enrollments: { plan: :student }).each do |meeting|
      enrollments << meeting.enrollments
    end
    enrollments.flatten.map do |enrollment| 
      student = enrollment.plan.student
      {
        id: student.id,
        name: student.full_name,
      }
    end.uniq
  end

  private
    def create_meetings(years = 10)
      years.times do |i|
        current_year = Date.today.year
        self.terms.each do |term|
          meeting = self.meetings.find_by({
            year: Date.new(current_year).advance(years: i).year,
            term: term.name,
          })
          if meeting.nil?
            self.meetings.create({
              year: Date.new(current_year).advance(years: i).year,
              term: term.name,
              sessions: self.sessions.to_a
            })
          end
        end
      end
    end

    def find_future_meetings
      current_year = Date.today.year
      self.meetings.where('year >= ?', current_year)
    end

    def cancel_disassociated_meetings
      find_future_meetings.each do |meeting|
        unless self.terms.pluck(:name).include? meeting.term
          meeting.canceled = true
          meeting.save
        end
      end
    end

    def uncancel_associated_meetings
      find_future_meetings.each do |meeting|
        if self.terms.pluck(:name).include? meeting.term
          meeting.canceled = false
          meeting.save
        end
      end
    end

    def update_meetings(years = 10)
      cancel_disassociated_meetings
      uncancel_associated_meetings
    end

    # def destroy_future_meetings
    #   self.find_future_meetings.destroy_all
    # end

    def upcase_number
      self.number.upcase!
    end

end
