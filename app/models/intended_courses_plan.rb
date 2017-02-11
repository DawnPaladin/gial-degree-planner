class IntendedCoursesPlan < ApplicationRecord

  belongs_to :plan
  belongs_to :intended_course, foreign_key: :course_id, class_name: 'Course'
end
