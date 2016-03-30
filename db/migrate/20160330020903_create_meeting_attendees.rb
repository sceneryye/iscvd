class CreateMeetingAttendees < ActiveRecord::Migration
  def change
    create_table :meeting_attendees,:options=>"ENGINE=MyISAM DEFAULT CHARSET=utf8" do |t|
        t.string :email
        t.string :name
        t.references :meetings,  index: true
        t.references :user,  index: true

       t.timestamps
    end
  end
end
