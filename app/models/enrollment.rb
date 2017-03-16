class Enrollment < ApplicationRecord
  belongs_to :plan
  belongs_to :scheduled_class, foreign_key: :meeting_id, class_name: 'Meeting'

  validate :prevent_enrollment_in_canceled_meeting
  after_destroy :destroy_empty_canceled_meeting

  private
    def prevent_enrollment_in_canceled_meeting
      if scheduled_class.canceled
        errors[:base] << "Cannot enroll student in a canceled class"
        return false
      end
    end

    def destroy_empty_canceled_meeting
      if scheduled_class.canceled && scheduled_class.enrollments.count == 0
        scheduled_class.destroy
      end
    end

end
