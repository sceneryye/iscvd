class MeetingAttendee < ActiveRecord::Base
	belongs_to :user
	belongs_to :meeting

	validates :name,  presence: true
 	validates :email,  presence: true

	default_scope {order 'created_at DESC'}

end
