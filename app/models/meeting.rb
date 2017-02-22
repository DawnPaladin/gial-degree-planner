class Meeting < ApplicationRecord
  # validations

  # associations
  has_many :enrollments, dependent: :destroy
  has_many :plans, through: :enrollments
  has_many :enrolled_students, through: :plans, source: :student

  has_many :meetings_teachers, dependent: :destroy
  has_many :teachers, through: :meetings_teachers, inverse_of: :meetings

  has_many :meetings_sessions, dependent: :destroy
  has_many :sessions, through: :meetings_sessions

  belongs_to :course

  accepts_nested_attributes_for :teachers

  def self.find_meeting(course, year, term, session)
    Meeting.where(course: course, year: year.value, term: term.name, session: session.name).first
  end

  def autosave_associated_records_for_teachers
    # Find or create the teacher by name
    self.teachers.each do |teacher|
      teacher_attrs = { first_name: teacher.first_name, last_name: teacher.last_name, title: teacher.title }
      found_teacher = Teacher.find_by(teacher_attrs)
      if !found_teacher
        self.teachers.create(first_name: teacher.first_name, last_name: teacher.last_name, title: teacher.title)
      else
        self.teachers << teacher unless self.teachers.to_a.include?(found_teacher)
      end
    end
  end

end
