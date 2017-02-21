class MeetingsSession < ApplicationRecord

  belongs_to :meeting
  belongs_to :session
end
