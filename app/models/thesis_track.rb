class ThesisTrack < ApplicationRecord

  belongs_to :concentration

  def courses
    [Course.thesis_writing, Course.thesis_course]
  end
  
end
