class RemoveEmailUniqueness < ActiveRecord::Migration[5.0]
  def change
    change_column_null :students, :email, :string, true
  end
end
