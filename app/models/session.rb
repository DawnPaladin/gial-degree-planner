class Session < ApplicationRecord

  has_many :courses_sessions
  has_many :courses, through: :courses_sessions

  has_many :sessions_terms
  has_many :terms, through: :sessions_terms
  
end
