class CreateMeetings < ActiveRecord::Migration
  def change
  	create_table :meetings,:options=>"ENGINE=MyISAM DEFAULT CHARSET=utf8" do |t|
        t.string :title_en
        t.string :location_en
        t.string :title_zh
        t.string :location_zh
        t.string :slug, :unique=>true,:null=>false
        t.datetime :start_time
        t.datetime :end_time

  	   t.timestamps
    end
  end
end
