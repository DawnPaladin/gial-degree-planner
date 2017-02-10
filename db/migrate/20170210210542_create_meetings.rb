class CreateMeetings < ActiveRecord::Migration[5.0]
  def change
    create_table :meetings do |t|
      t.integer :course_id, null: false
      t.string :teaching_style
      t.integer :year
      t.string :term
      t.string :session

      t.timestamps
    end

    add_index :meetings, :course_id

  end
end
