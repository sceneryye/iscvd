#encoding:utf-8
class MeetingsController < ApplicationController
	
	def index

		@meetings = Meeting.all
	end

	def show
		@meeting  = Meeting.find(params[:id])
		render :layout=> @meeting.layout.present? ? @meeting.layout : 'application'
	end
end

