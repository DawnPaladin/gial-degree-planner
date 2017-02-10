class CreateConcentrations < ActiveRecord::Migration[5.0]
  def change
    create_table :concentrations do |t|
      t.integer :degree_id, null: false
      t.string :name, null: false
      t.text :description

      t.timestamps
    end

    add_index :concentrations, :degree_id

  end
end
