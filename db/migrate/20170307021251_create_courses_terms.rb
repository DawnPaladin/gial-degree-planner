class CreateCoursesTerms < ActiveRecord::Migration[5.0]
  def change
    create_table :courses_terms do |t|
      t.integer :course_id
      t.integer :term_id

      t.timestamps
    end
  end
end
