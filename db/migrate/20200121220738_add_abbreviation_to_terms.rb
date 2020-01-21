class AddAbbreviationToTerms < ActiveRecord::Migration[5.0]
  def change
    add_column :terms, :abbreviation, :string, default: ""
  end
end
