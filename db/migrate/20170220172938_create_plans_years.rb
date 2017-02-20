class CreatePlansYears < ActiveRecord::Migration[5.0]
  def change
    create_table :plans_years do |t|
      t.references :year
      t.references :plan
      t.timestamps
    end
  end
end
