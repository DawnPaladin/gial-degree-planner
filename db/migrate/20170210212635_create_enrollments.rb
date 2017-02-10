class CreateEnrollments < ActiveRecord::Migration[5.0]
  def change
    create_table :enrollments do |t|
      t.integer :plan_id
      t.integer :meeting_id

      t.timestamps
    end

    add_index :enrollments, [:plan_id, :meeting_id]
    
  end
end
