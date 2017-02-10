class CreateForeignCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :foreign_courses do |t|
      t.string :name, null: false
      t.string :number
      t.integer :units

      t.timestamps
    end
  end
end
