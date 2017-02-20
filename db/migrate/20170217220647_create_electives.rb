class CreateElectives < ActiveRecord::Migration[5.0]
  def change
    create_table :electives do |t|
      t.integer :course_id
      t.integer :plan_id
      t.string :category_name

      t.timestamps
    end
  end
end
