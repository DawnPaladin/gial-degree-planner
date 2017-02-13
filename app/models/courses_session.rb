class CoursesSession < ApplicationRecord

  belongs_to :course
  belongs_to :session
end
