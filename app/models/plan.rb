class Plan < ApplicationRecord
  # lifecycle
  after_create :add_degree_requirements_to_intended

  ###### make intended courses degree.requried courses

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

  has_many :enrollments, dependent: :destroy
  has_many :scheduled_classes, through: :enrollments,
           class_name: 'Meeting'

  belongs_to :degree
  has_many :required_courses, through: :degree


  def course_groupings
    {
      intended_courses: self.intended_courses,
      completed_courses: self.completed_courses,
      required_courses: self.required_courses,
      scheduled_classes: self.scheduled_classes
    }
  end

  def add_or_remove_courses(opts)
    add_or_remove_completed(opts[:completed]) if opts[:completed]
    add_or_remove_intended(opts[:intended]) if opts[:intended]
  end

  def courses
    self.completed_courses + self.intended_courses
  end

   # TODO More edge case coverage
  def thesis_starts
    unless self.scheduled_classes.empty? || Course.thesis_writing.meetings.empty?
      self.scheduled_classes.merge(Course.thesis_writing.meetings).first
    end
  end

  private

    def add_or_remove_intended(course)
      puts self.intended_courses.include?(course)
      if self.intended_courses.include?(course)
        puts 'deleting'
        self.intended_courses.delete(course)
      else
        puts 'adding'
        self.intended_courses << course
      end
    end

    def add_or_remove_completed(course)
      if self.completed_courses.include?(course)
        self.completed_courses.delete(course)
      else
        self.completed_courses << course
      end
    end

    def add_degree_requirements_to_intended
      self.intended_courses = self.required_courses
    end


end
