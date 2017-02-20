# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.


ActiveRecord::Schema.define(version: 20170220172343) do


  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "advisors", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "first_name",                             null: false
    t.string   "last_name",                              null: false
    t.boolean  "is_admin",               default: false, null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["email"], name: "index_advisors_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_advisors_on_reset_password_token", unique: true, using: :btree
  end

  create_table "categories", force: :cascade do |t|
    t.string   "name",             null: false
    t.integer  "required_units"
    t.integer  "concentration_id", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["concentration_id"], name: "index_categories_on_concentration_id", using: :btree
  end

  create_table "categories_courses", force: :cascade do |t|
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "course_id"
    t.integer  "category_id"
    t.index ["course_id", "category_id"], name: "index_categories_courses_on_course_id_and_category_id", using: :btree
  end

  create_table "completed_courses_plans", force: :cascade do |t|
    t.integer  "plan_id"
    t.integer  "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id", "course_id"], name: "index_completed_courses_plans_on_plan_id_and_course_id", using: :btree
  end

  create_table "concentrations", force: :cascade do |t|
    t.integer  "degree_id",   null: false
    t.string   "name",        null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["degree_id"], name: "index_concentrations_on_degree_id", using: :btree
  end

  create_table "course_prerequisites", force: :cascade do |t|
    t.integer  "requiring_course_id"
    t.integer  "required_course_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "courses", force: :cascade do |t|
    t.integer  "category_id"
    t.integer  "term_id",     null: false
    t.string   "name",        null: false
    t.string   "number",      null: false
    t.text     "description"
    t.integer  "units",       null: false
    t.string   "level"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["category_id"], name: "index_courses_on_category_id", using: :btree
    t.index ["name"], name: "index_courses_on_name", using: :btree
    t.index ["number"], name: "index_courses_on_number", unique: true, using: :btree
  end

  create_table "courses_sessions", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id", "session_id"], name: "index_courses_sessions_on_course_id_and_session_id", using: :btree
  end

  create_table "degree_course_requirements", force: :cascade do |t|
    t.integer  "degree_id"
    t.integer  "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["degree_id", "course_id"], name: "index_degree_course_requirements_on_degree_id_and_course_id", using: :btree
  end

  create_table "degrees", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "electives", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "plan_id"
    t.string   "category_name"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.boolean  "completed",     default: false
    t.boolean  "intended",      default: false
  end

  create_table "enrollments", force: :cascade do |t|
    t.integer  "plan_id"
    t.integer  "meeting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id", "meeting_id"], name: "index_enrollments_on_plan_id_and_meeting_id", using: :btree
  end

  create_table "foreign_course_prerequisites", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "foreign_course_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["course_id", "foreign_course_id"], name: "foreign_prerequisite_index", using: :btree
  end

  create_table "foreign_courses", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "number"
    t.integer  "units"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "intended_courses_plans", force: :cascade do |t|
    t.integer  "plan_id",    null: false
    t.integer  "course_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id", "course_id"], name: "index_intended_courses_plans_on_plan_id_and_course_id", using: :btree
  end

  create_table "meetings", force: :cascade do |t|
    t.integer  "course_id",      null: false
    t.string   "teaching_style"
    t.integer  "year"
    t.string   "term"
    t.string   "session"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["course_id"], name: "index_meetings_on_course_id", using: :btree
  end

  create_table "meetings_teachers", force: :cascade do |t|
    t.integer  "meeting_id"
    t.integer  "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id", "teacher_id"], name: "index_meetings_teachers_on_meeting_id_and_teacher_id", using: :btree
  end

  create_table "non_thesis_tracks", force: :cascade do |t|
    t.integer  "concentration_id", null: false
    t.integer  "elective_hours"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["concentration_id"], name: "index_non_thesis_tracks_on_concentration_id", using: :btree
  end

  create_table "plans", force: :cascade do |t|
    t.integer  "student_id",                        null: false
    t.integer  "concentration_id"
    t.integer  "graduation_year"
    t.string   "graduation_term"
    t.date     "registration_date"
    t.boolean  "latest_registered", default: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.integer  "degree_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sessions_terms", force: :cascade do |t|
    t.integer  "session_id"
    t.integer  "term_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_sessions_terms_on_session_id", using: :btree
    t.index ["term_id"], name: "index_sessions_terms_on_term_id", using: :btree
  end

  create_table "students", force: :cascade do |t|
    t.string   "first_name", null: false
    t.string   "last_name",  null: false
    t.string   "email",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "advisor_id"
    t.index ["email"], name: "index_students_on_email", unique: true, using: :btree
  end

  create_table "teacher_permissions", force: :cascade do |t|
    t.integer  "course_id",  null: false
    t.integer  "teacher_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id", "teacher_id"], name: "index_teacher_permissions_on_course_id_and_teacher_id", using: :btree
  end

  create_table "teachers", force: :cascade do |t|
    t.string   "title"
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "terms", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "terms_years", force: :cascade do |t|
    t.integer  "year_id"
    t.integer  "term_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["term_id"], name: "index_terms_years_on_term_id", using: :btree
    t.index ["year_id"], name: "index_terms_years_on_year_id", using: :btree
  end

  create_table "thesis_tracks", force: :cascade do |t|
    t.integer  "concentration_id", null: false
    t.integer  "thesis_hours",     null: false
    t.integer  "elective_hours"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["concentration_id"], name: "index_thesis_tracks_on_concentration_id", using: :btree
  end

  create_table "transferred_courses", force: :cascade do |t|
    t.integer  "plan_id"
    t.integer  "foreign_course_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "years", force: :cascade do |t|
    t.integer  "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
