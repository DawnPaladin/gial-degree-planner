class CoursePrerequisite < ApplicationRecord
  belongs_to :requiring_course, class_name: 'Course'
  belongs_to :required_course, class_name: 'Course'
end
