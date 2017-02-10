class CreateIntendedCoursesPlans < ActiveRecord::Migration[5.0]
  def change
    create_table :intended_courses_plans do |t|
      t.integer :plan_id, null: false
      t.integer :course_id, null: false

      t.timestamps
    end

    add_index :intended_courses_plans, [:plan_id, :course_id]
    
  end
end
