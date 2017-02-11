class AddAdvisorIdToStudent < ActiveRecord::Migration[5.0]
  def change
    add_column :students, :advisor_id, :integer
  end
end
