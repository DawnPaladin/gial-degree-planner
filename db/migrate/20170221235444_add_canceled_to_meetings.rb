class AddCanceledToMeetings < ActiveRecord::Migration[5.0]
  def change
    add_column :meetings, :canceled, :boolean, default: false
  end
end
