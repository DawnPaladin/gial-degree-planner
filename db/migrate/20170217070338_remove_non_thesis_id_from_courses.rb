class RemoveNonThesisIdFromCourses < ActiveRecord::Migration[5.0]
  def change
    remove_column :courses, :non_thesis_track_id, :integer
  end
end
