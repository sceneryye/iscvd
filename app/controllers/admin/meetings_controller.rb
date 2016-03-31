#encoding:utf-8
module Admin
class MeetingsController < Admin::BaseController

	before_action :set_meeting, only: [:edit, :update, :destroy]
	
	layout 'admin'
	def index

		@meetings = Meeting.all
	end

	def new
	    @meeting = Meeting.new
	 end

	def edit ()	end

	def create
		@meeting = Meeting.new(meeting_params)
		if @meeting.save    
		    redirect_to @meeting
		else
		  	new_admin_meeting_path
		end
	end


	def update
		respond_to do |format|
		  if @meeting.update(meeting_params)
		    format.html { redirect_to @meeting, notice: 'Meeting was successfully updated.' }
		    format.json { render :show, status: :ok, location: @meeting }
		  else
		    format.html { render :edit }
		    format.json { render json: @meeting.errors, status: :unprocessable_entity }
		  end
		end
	end


	def destroy
		@meeting.destroy
		respond_to do |format|
		  format.html { redirect_to admin_meetings_url, notice: 'Meeting was successfully destroyed.' }
		  format.json { head :no_content }
		end
	end

	private

	# Use callbacks to share common setup or constraints between actions.
	def set_meeting
		@meeting = Meeting.find(params[:id])
	end


	def meeting_params
		params.require(:meeting).permit(:title_en,:title_zh,:location_zh,:location_en,:slug,:end_time,:start_time)
	end
end
end