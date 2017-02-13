class AddPlanIdToDegrees < ActiveRecord::Migration[5.0]
  def change
    add_column :plans, :degree_id, :integer
  end
end
