class CreateSessionsTerms < ActiveRecord::Migration[5.0]
  def change
    create_table :sessions_terms do |t|
      t.references :session
      t.references :term
      t.timestamps
    end
  end
end
