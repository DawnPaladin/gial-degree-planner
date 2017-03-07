class UnrequireTerm < ActiveRecord::Migration[5.0]
  def change
    change_column_null :courses, :term_id, :integer, true
  end
end
