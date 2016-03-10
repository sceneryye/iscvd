class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails, options: 'ENGINE=MyISAM DEFAULT CHARSET=utf8' do |t|
      t.string :title,   null: false
      t.string :body


      t.timestamps
    end
  end
end
