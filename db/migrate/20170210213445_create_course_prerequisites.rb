class CreateCoursePrerequisites < ActiveRecord::Migration[5.0]
  def change
    create_table :course_prerequisites do |t|
      t.integer :course_id
      t.integer :required_course_id

      t.timestamps
    end

    add_index :course_prerequisites, [:course_id, :required_course_id]

  end
end
