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
    {
      'intended_courses': self.intended_courses,
      'completed_courses': self.completed_courses,
      'scheduled_classes': self.scheduled_classes
    }
  end

  def add_or_remove_courses(opts)
    puts 'in add or remove'
    add_or_remove_completed(opts[:completed]) if opts[:completed]
    add_or_remove_intended(opts[:intended]) if opts[:intended]
  end


  private

    def add_or_remove_intended(course)
      puts 'in intended'
      if self.intended_courses.include?(course)
        self.intended_courses.delete(course)
      else
        self.intended_courses << course
      end
    end

    def add_or_remove_completed(course)
      puts 'in completed'
      if self.completed_courses.include?(course)
        self.completed_courses.delete(course)
      else
        self.completed_courses << course
      end
    end
end
