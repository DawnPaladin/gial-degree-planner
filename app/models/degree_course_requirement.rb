class DegreeCourseRequirement < ApplicationRecord

  belongs_to :degree
  belongs_to :course
  
end
