class Concentration < ApplicationRecord
  # validations

  # associations
  has_many :plans
  has_many :categories
  has_many :courses, through: :categories

  has_one :thesis_track
  has_one :non_thesis_track

  belongs_to :degree

  accepts_nested_attributes_for :categories, allow_destroy: true
end
