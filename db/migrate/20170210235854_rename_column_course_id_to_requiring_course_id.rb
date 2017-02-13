class RenameColumnCourseIdToRequiringCourseId < ActiveRecord::Migration[5.0]
  def change
    remove_index :course_prerequisites, [:course_id, :required_course_id]
    rename_column :course_prerequisites, :course_id, :requiring_course_id

  end
end
