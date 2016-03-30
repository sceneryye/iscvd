class CreateMeetings < ActiveRecord::Migration
  def change
  	create_table :meetings,:options=>"ENGINE=MyISAM DEFAULT CHARSET=utf8" do |t|
        t.string :title
        t.string :slug, :unique=>true,:null=>false
        t.string :location
        t.datetime :start_time
        t.datetime :end_time

  	   t.timestamps
    end
  end
end
