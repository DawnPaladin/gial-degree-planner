class AddIntendedAndCompletedToElectives < ActiveRecord::Migration[5.0]
  def change
    add_column :electives, :completed, :boolean, default: false
    add_column :electives, :intended, :boolean, default: false
  end
end
