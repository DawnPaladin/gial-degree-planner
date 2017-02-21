class CreateMeetingsSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :meetings_sessions do |t|
      t.integer :meeting_id
      t.integer :session_id

      t.timestamps
    end
    add_index :meetings_sessions, [:meeting_id, :session_id]
  end
end
