class CoursesTerm < ApplicationRecord

  belongs_to :course, optional: true
  belongs_to :term, optional: true

end
