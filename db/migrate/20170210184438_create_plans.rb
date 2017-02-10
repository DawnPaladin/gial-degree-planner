class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    create_table :plans do |t|
      t.integer :student_id, null: false
      t.integer :concentration_id
      t.integer :graduation_year
      t.string :graduation_term
      t.date :registration_date
      t.boolean :latest_registered, default: false

      t.timestamps
    end
  end
end
