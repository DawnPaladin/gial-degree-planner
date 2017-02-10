class CreateCoursesSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :courses_sessions do |t|
      t.integer :course_id
      t.integer :session_id

      t.timestamps
    end

    add_index :courses_sessions, [:course_id, :session_id]

  end
end
