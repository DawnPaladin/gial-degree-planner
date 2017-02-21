class Session < ApplicationRecord

  has_many :courses_sessions
  has_many :courses, through: :courses_sessions

  has_many :sessions_terms
  has_many :terms, through: :sessions_terms

  has_many :meetings_sessions, dependent: :destroy
  has_many :meetings, through: :meetings_sessions
  
end
