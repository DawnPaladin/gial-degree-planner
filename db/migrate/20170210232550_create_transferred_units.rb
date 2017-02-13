class CreateTransferredUnits < ActiveRecord::Migration[5.0]
  def change
    create_table :transferred_units do |t|
      t.integer :plan_id
      t.integer :foreign_course_id
      t.timestamps
    end
  end
end
