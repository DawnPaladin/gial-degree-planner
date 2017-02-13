class MeetingsTeacher < ApplicationRecord

  belongs_to :meeting
  belongs_to :teacher
  
end
