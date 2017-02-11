class CompletedCoursesPlan < ApplicationRecord
  # validations

  # associations
  belongs_to :plan
  belongs_to :completed_course, :foreign_key: :course_id, class_name: 'Course'
end
