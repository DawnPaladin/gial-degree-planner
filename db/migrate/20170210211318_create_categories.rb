class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.integer :required_units
      t.integer :concentration_id, null: false

      t.timestamps
    end

    add_index :categories, :concentration_id
  end
end
