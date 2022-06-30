class CreateProfessionals < ActiveRecord::Migration[7.0]
  def change
    create_table :professionals do |t|
      t.references :industry, null: false, foreign_key: true
      t.string :full_name
      t.string :image_url
      t.string :bio
      t.string :linkedin
      t.string :current_company

      t.timestamps
    end
  end
end
