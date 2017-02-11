class RenameInstructorPermissionsToTeacherPermissions < ActiveRecord::Migration[5.0]
  def change
    rename_table :instructor_permissions, :teacher_permissions
  end
end
