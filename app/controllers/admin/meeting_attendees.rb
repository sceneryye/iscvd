#encoding:utf-8
module Admin
class MeetingAttendeesController < Admin::BaseController
	layout 'admin'
	# before_action {@forums = Forum.all}

	def index
		@attendees = MeetingAttend.all
	
	end

	def show
		
	end
end
end
