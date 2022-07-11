class CreateMeetingApplications < ActiveRecord::Migration[7.0]
  def change
    create_table :meeting_applications do |t|
      t.references :meeting, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :is_approved

      t.timestamps
    end
  end
end
