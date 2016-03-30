class CreatePageCategories < ActiveRecord::Migration
  def change
  	create_table :page_categories,:options=>"ENGINE=MyISAM DEFAULT CHARSET=utf8" do |t|
        t.string :name   
        t.string :type
        t.string :layout

  	   t.timestamps
    end
  end
end
