#encoding:utf-8
module Admin
	class MeetingAttendeesController < Admin::BaseController
		layout 'admin'
		# before_action {@forums = Forum.all}

		def index
			@attendees = MeetingAttendee.all
		
		end

		def show
			@attendee = MeetingAttendee.find(params[:id])
		end
	end
end
