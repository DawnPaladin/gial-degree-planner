class RemoveSessionFromMeeting < ActiveRecord::Migration[5.0]
  def change
    remove_column :meetings, :session, :string
  end
end
