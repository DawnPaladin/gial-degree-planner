class CreateCompletedCoursesPlans < ActiveRecord::Migration[5.0]
  def change
    create_table :completed_courses_plans do |t|
      t.integer :plan_id
      t.integer :course_id

      t.timestamps
    end

    add_index :completed_courses_plans, [:plan_id, :course_id]

  end
end
