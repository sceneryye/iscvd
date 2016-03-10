class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users, options: 'ENGINE=MyISAM DEFAULT CHARSET=utf8' do |t|
      t.string :username,   null: false
      t.string :name
      t.string :mobile,  null: false
      t.column :sex, "ENUM('0','1','2')",:default=>'0' ###1:male  2：female
      t.string :email
      t.string :password_digest, null: false
      t.column :role ,"ENUM('0', '1','2','3','4')",:default=>"1"   ###0 admin 
      t.string :profession, limit:45
      t.string :location, limit:45


      t.timestamps
    end
   # add_index :users, :username, unique: true
  end
end
