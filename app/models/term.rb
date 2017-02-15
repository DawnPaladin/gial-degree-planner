class Term < ApplicationRecord

  has_many :courses

  has_many :sessions_terms
  has_many :sessions, through: :sessions_terms

end
