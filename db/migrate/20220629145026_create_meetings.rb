class CreateMeetings < ActiveRecord::Migration[7.0]
  def change
    create_table :meetings do |t|
      t.datetime :meeting
      t.references :user, null: false, foreign_key: true
      t.references :professional, null: false, foreign_key: true

      t.timestamps
    end
  end
end
