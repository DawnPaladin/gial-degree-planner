class CreateCategoriesCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :categories_courses do |t|

      t.timestamps
    end
  end
end
