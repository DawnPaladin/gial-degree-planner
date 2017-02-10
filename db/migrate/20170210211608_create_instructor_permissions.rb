class CreateInstructorPermissions < ActiveRecord::Migration[5.0]
  def change
    create_table :instructor_permissions do |t|
      t.integer :course_id, null: false
      t.integer :teacher_id, null: false

      t.timestamps
    end

    add_index :instructor_permissions, [:course_id, :teacher_id]

  end
end
