class Student < ApplicationRecord
  # validations

  # associations
  has_one :plan

  belongs_to :advisor

  # lifecycle
  after_create :create_associated_plan

  private
    def create_associated_plan
      self.create_plan(degree: Degree.first)
    end
end
