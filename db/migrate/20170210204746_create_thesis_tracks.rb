class CreateThesisTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :thesis_tracks do |t|
      t.integer :concentration_id, null: false
      t.integer :thesis_hours, null: false
      t.integer :elective_hours

      t.timestamps
    end

    add_index :thesis_tracks, :concentration_id

  end
end
