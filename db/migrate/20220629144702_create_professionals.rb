class CreateProfessionals < ActiveRecord::Migration[7.0]
  def change
    create_table :professionals do |t|
      t.string :full_name
      t.string :username
      t.string :password_digest
      t.references :industry, null: false, foreign_key: true
      t.string :bio
      # t.string :image_url
      # t.string :linkedin

      t.timestamps
    end
  end
end
