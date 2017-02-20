class Session < ApplicationRecord

  has_many :courses_sessions, dependent: :destroy
  has_many :courses, through: :courses_sessions

  has_many :sessions_terms, dependent: :destroy
  has_many :terms, through: :sessions_terms

  
  
end
