class RenameTransferredUnitsToTransferredCourses < ActiveRecord::Migration[5.0]
  def change
    rename_table :transferred_units, :transferred_courses
  end
end
