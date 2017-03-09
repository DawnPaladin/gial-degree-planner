class AddArchivedToStudents < ActiveRecord::Migration[5.0]
  def change
    add_column :students, :archived, :boolean, default: false
  end
end
