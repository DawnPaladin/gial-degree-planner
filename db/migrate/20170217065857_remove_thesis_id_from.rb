class RemoveThesisIdFrom < ActiveRecord::Migration[5.0]
  def change
    remove_column :courses, :thesis_track_id
  end
end
