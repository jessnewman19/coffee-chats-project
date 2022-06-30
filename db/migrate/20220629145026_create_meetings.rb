class CreateMeetings < ActiveRecord::Migration[7.0]
  def change
    create_table :meetings do |t|
      t.date :meeting_date
      t.time :meeting_time
      t.references :user, null: false, foreign_key: true
      t.references :professional, null: false, foreign_key: true

      t.timestamps
    end
  end
end
