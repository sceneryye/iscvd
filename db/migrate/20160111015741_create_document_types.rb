class CreateDocumentTypes < ActiveRecord::Migration
  def change
    create_table :document_types, options: 'ENGINE=MyISAM DEFAULT CHARSET=utf8' do |t|
      t.string :name,   null: false
      t.integer :position

      t.timestamps
    end
  end
end
