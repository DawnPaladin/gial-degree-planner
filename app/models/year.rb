class Year < ApplicationRecord

  has_many :terms_years, dependent: :destroy
  has_many :terms, through: :terms_years


end
