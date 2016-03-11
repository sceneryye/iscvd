class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents, options: 'ENGINE=MyISAM DEFAULT CHARSET=utf8' do |t|
      t.string :title,   null: false
      t.string :body
      t.references :document_type,  index: true
      t.integer :view_times



      t.timestamps
    end
  end
end
