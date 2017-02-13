class Session < ApplicationRecord

  has_many :courses_sessions
  has_many :courses, through: :courses_sessions
  
end
