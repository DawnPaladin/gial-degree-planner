class Year < ApplicationRecord

  has_many :terms_years, dependent: :destroy
  has_many :terms, through: :terms_years

  has_many :plans_years, dependent: :destroy
  has_many :plans, through: :plans_years

end
