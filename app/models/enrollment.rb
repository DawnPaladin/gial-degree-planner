class Enrollment < ApplicationRecord
  belongs_to :plan
  belongs_to :scheduled_class, foreign_key: :meeting_id, class_name: 'Meeting'
end
