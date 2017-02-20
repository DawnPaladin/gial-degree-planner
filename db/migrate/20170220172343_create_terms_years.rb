class CreateTermsYears < ActiveRecord::Migration[5.0]
  def change
    create_table :terms_years do |t|
      t.references :year
      t.references :term
      t.timestamps
    end
  end
end
