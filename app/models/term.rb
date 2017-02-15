class Term < ApplicationRecord

  has_many :courses

  has_many :sessions_terms
  has_many :sessions, through: :sessions_terms

  def self.get_all
    Term.where('name != ?', 'Any')
  end

end
