class CreateMeetingsTeachers < ActiveRecord::Migration[5.0]
  def change
    create_table :meetings_teachers do |t|
      t.integer :meeting_id
      t.integer :teacher_id

      t.timestamps
    end

    add_index :meetings_teachers, [:meeting_id, :teacher_id]

  end
end
