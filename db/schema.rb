# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_06_29_145026) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "industries", force: :cascade do |t|
    t.string "industry"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meetings", force: :cascade do |t|
    t.date "meeting_date"
    t.time "meeting_time"
    t.bigint "user_id", null: false
    t.bigint "professional_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["professional_id"], name: "index_meetings_on_professional_id"
    t.index ["user_id"], name: "index_meetings_on_user_id"
  end

  create_table "professionals", force: :cascade do |t|
    t.bigint "industry_id", null: false
    t.string "full_name"
    t.string "image_url"
    t.string "bio"
    t.string "linkedin"
    t.string "current_company"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["industry_id"], name: "index_professionals_on_industry_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "full_name"
    t.string "username"
    t.string "password_digest"
    t.bigint "industry_id", null: false
    t.string "image_url"
    t.string "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["industry_id"], name: "index_users_on_industry_id"
  end

  add_foreign_key "meetings", "professionals"
  add_foreign_key "meetings", "users"
  add_foreign_key "professionals", "industries"
  add_foreign_key "users", "industries"
end
