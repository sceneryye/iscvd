class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments, options: 'ENGINE=MyISAM DEFAULT CHARSET=utf8' do |t|
      t.text :body, null: false
      t.references :users, index: true
      t.references :pages, index: true

      t.timestamps
    end
  end
end
