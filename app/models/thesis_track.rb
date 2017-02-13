class ThesisTrack < ApplicationRecord

  belongs_to :concentration
  has_many :courses
  
end
