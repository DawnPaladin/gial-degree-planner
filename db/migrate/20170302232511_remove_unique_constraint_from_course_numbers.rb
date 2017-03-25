class RemoveUniqueConstraintFromCourseNumbers < ActiveRecord::Migration[5.0]
  def change
    remove_index :courses, :number
    add_index :courses, :number
  end
end
