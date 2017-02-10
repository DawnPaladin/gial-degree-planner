class CreateForeignCoursePrerequisites < ActiveRecord::Migration[5.0]
  def change
    create_table :foreign_course_prerequisites do |t|
      t.integer :course_id
      t.integer :required_foreign_course_id

      t.timestamps
    end

    add_index :foreign_course_prerequisites, [:course_id, :required_foreign_course_id], name: :foreign_prerequisite_index

  end
end
