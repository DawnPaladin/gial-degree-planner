class Concentration < ApplicationRecord
  # validations

  # associations
  has_many :plans
  has_many :categories

  has_one :thesis_track
  has_one :non_thesis_track

  belongs_to :degree
end
