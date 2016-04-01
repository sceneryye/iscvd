class CreateMaillogs < ActiveRecord::Migration
  def change
    create_table :maillogs do |t|
      t.string :type
      t.string :users
      t.integer :email_id

      t.timestamps null: false
    end
  end
end
