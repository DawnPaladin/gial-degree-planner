class CreateDegreeCourseRequirements < ActiveRecord::Migration[5.0]
  def change
    create_table :degree_course_requirements do |t|

      t.integer :degree_id
      t.integer :course_id

      t.timestamps
    end

    add_index :degree_course_requirements, [:degree_id, :course_id]
  end
end
