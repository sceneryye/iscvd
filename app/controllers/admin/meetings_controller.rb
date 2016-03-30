#encoding:utf-8
class MeetingsController < ApplicationController

	def index

		@meetings = Meeting.all
	end

	def new
	    @meeting = Meeting.new
	    render layout: false
	 end

	def edit
	end

	def create
		@meeting = Meeting.new(meeting_params)
		if @meeting.save    
		    redirect_to root_url
		  end
		else
		  redirect_to admin_path
		end
	end


	def update
		respond_to do |format|
		  if @meeting.update(meeting_params)
		    format.html { redirect_to @meeting, notice: 'meeting was successfully updated.' }
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
		  format.html { redirect_to meetings_url, notice: 'meeting was successfully destroyed.' }
		  format.json { head :no_content }
		end
	end

	private

	# Use callbacks to share common setup or constraints between actions.
	def set_meeting
		@meeting = Meeting.find(params[:id])
	end


	def meeting_params
		params.require(:meeting).permit(:name, :email, :password, :password_digest, :username, :role, :avatar, :mobile, :sex,
	                             :password_confirmation)
	end
end
