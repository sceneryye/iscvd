class CreateEmailSentLogs < ActiveRecord::Migration
  def change
    create_table :email_sent_logs, options: 'ENGINE=MyISAM DEFAULT CHARSET=utf8' do |t|
      t.references :email,  index: true
      t.string :sent_to,   null: false


      t.timestamps
    end
   # add_index :users, :username, unique: true
  end
end
