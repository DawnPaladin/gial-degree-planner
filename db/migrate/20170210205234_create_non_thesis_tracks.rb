class CreateNonThesisTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :non_thesis_tracks do |t|
      t.integer :concentration_id, null: false
      t.integer :elective_hours

      t.timestamps
    end

    add_index :non_thesis_tracks, :concentration_id
  end
end
