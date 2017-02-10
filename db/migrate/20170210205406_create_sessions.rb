class CreateSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :sessions do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
