class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.integer :category_id
      t.integer :non_thesis_track_id
      t.integer :thesis_track_id
      t.integer :term_id, null: false
      t.string :name, null: false
      t.string :number, null: false
      t.text :description
      t.integer :units, null: false
      t.string :level

      t.timestamps
    end

    add_index :courses, :name
    add_index :courses, :number, unique: true
    add_index :courses, :category_id

  end
end
