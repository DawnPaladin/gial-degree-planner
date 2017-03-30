class AddLocalBooleanToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :local, :boolean, default: true
  end
end
