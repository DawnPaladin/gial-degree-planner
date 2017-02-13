class ForeignCoursePrerequisite < ApplicationRecord

  belongs_to :course
  belongs_to :foreign_course
  
end
