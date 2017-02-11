class RenameRequiredForeignCourseToForeignCourseOnPrereqs < ActiveRecord::Migration[5.0]
  def change
    rename_column :foreign_course_prerequisites, :required_foreign_course_id, :foreign_course_id
  end
end
