# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160330021003) do

  create_table "ckeditor_assets", force: :cascade do |t|
    t.string   "data_file_name",    limit: 255, null: false
    t.string   "data_content_type", limit: 255
    t.integer  "data_file_size",    limit: 4
    t.integer  "assetable_id",      limit: 4
    t.string   "assetable_type",    limit: 30
    t.string   "type",              limit: 30
    t.integer  "width",             limit: 4
    t.integer  "height",            limit: 4
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "ckeditor_assets", ["assetable_type", "assetable_id"], name: "idx_ckeditor_assetable", using: :btree
  add_index "ckeditor_assets", ["assetable_type", "type", "assetable_id"], name: "idx_ckeditor_assetable_type", using: :btree

  create_table "comments", force: :cascade do |t|
    t.text     "body",       limit: 65535, null: false
    t.integer  "users_id",   limit: 4
    t.integer  "pages_id",   limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["pages_id"], name: "index_comments_on_pages_id", using: :btree
  add_index "comments", ["users_id"], name: "index_comments_on_users_id", using: :btree

  create_table "emails", force: :cascade do |t|
    t.string   "title",      limit: 255,   null: false
    t.text     "content",    limit: 65535, null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "meeting_attendees", force: :cascade do |t|
    t.string   "email",       limit: 255
    t.string   "name",        limit: 255
    t.integer  "meetings_id", limit: 4
    t.integer  "user_id",     limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "meeting_attendees", ["meetings_id"], name: "index_meeting_attendees_on_meetings_id", using: :btree
  add_index "meeting_attendees", ["user_id"], name: "index_meeting_attendees_on_user_id", using: :btree

  create_table "meetings", force: :cascade do |t|
    t.string   "title_en",    limit: 255
    t.string   "location_en", limit: 255
    t.string   "title_zh",    limit: 255
    t.string   "location_zh", limit: 255
    t.string   "slug",        limit: 255, null: false
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "page_categories", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "type",       limit: 255
    t.string   "layout",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pages", force: :cascade do |t|
    t.string   "title",            limit: 255
    t.text     "body",             limit: 65535
    t.string   "head_pics",        limit: 255
    t.string   "slug",             limit: 255,               null: false
    t.string   "author",           limit: 255
    t.string   "from",             limit: 255
    t.integer  "pageviews",        limit: 4
    t.integer  "comments_count",   limit: 4,     default: 0
    t.integer  "page_category_id", limit: 4
    t.integer  "meeting_id",       limit: 4
    t.string   "layout",           limit: 255
    t.string   "type",             limit: 255
    t.string   "language",         limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "pages", ["meeting_id"], name: "index_pages_on_meeting_id", using: :btree
  add_index "pages", ["page_category_id"], name: "index_pages_on_page_category_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",               limit: 255
    t.string   "mobile",             limit: 255,                 null: false
    t.string   "sex",                limit: 1,   default: "0"
    t.string   "email",              limit: 255
    t.string   "password_digest",    limit: 255,                 null: false
    t.string   "role",               limit: 1,   default: "0"
    t.string   "avator",             limit: 500
    t.string   "profession",         limit: 45
    t.string   "location",           limit: 45
    t.string   "wexin_openid",       limit: 255
    t.integer  "comments_count",     limit: 4,   default: 0
    t.integer  "participants_count", limit: 4,   default: 0
    t.integer  "events_count",       limit: 4,   default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "activation_digest",  limit: 255
    t.string   "remember_digest",    limit: 255
    t.boolean  "activated",                      default: false
    t.datetime "activated_at"
  end

end
