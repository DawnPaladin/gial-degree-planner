class AddCourseAndCategoryIdToCategoriesCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :categories_courses, :course_id, :integer
    add_column :categories_courses, :category_id, :integer
    add_index :categories_courses, [:course_id, :category_id]
  end

end
