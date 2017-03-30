class Term < ApplicationRecord

  has_many :courses_terms
  has_many :courses, through: :courses_terms

  has_many :sessions_terms, dependent: :destroy
  has_many :sessions, through: :sessions_terms

  has_many :terms_years, dependent: :destroy
  has_many :years, through: :terms_years

  def self.get_all
    Term.where('name != ?', 'Any')
  end

end
