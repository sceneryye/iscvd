class CreatePages < ActiveRecord::Migration
  def change
  	create_table :pages,:options=>"ENGINE=MyISAM DEFAULT CHARSET=utf8" do |t|
        t.string :title
        t.text :body
        t.string :head_pics
        t.string :slug, :unique=>true,:null=>false
        t.string :author
        t.string :from
        t.integer :pageviews
        t.integer :comments_count, default: 0
        t.references :page_categories,  index: true
        t.string :layout
        t.string :type
        t.string :language

  	   t.timestamps
    end
  end
end
