#encoding:utf-8
class DocumentsController < ApplicationController
	# before_action {@forums = Forum.all}

	def new
	    @meeting_attendee = MeetingAttendee.new
	 end

	def edit
	end

	def create
		@meeting_attendee = MeetingAttendee.new(meeting_attendee_params)
		if @meeting_attendee.save    
		    redirect_to root_url
		  end
		else
		  redirect_to root_url
		end
	end


	def update
		respond_to do |format|
		  if @meeting_attendee.update(meeting_attendee_params)
		    format.html { redirect_to @meeting_attendee, notice: 'meeting_attendee was successfully updated.' }
		    format.json { render :show, status: :ok, location: @meeting_attendee }
		  else
		    format.html { render :edit }
		    format.json { render json: @meeting_attendee.errors, status: :unprocessable_entity }
		  end
		end
	end


	def destroy
		@meeting_attendee.destroy
		respond_to do |format|
		  format.html { redirect_to meeting_attendees_url, notice: 'meeting_attendee was successfully destroyed.' }
		  format.json { head :no_content }
		end
	end

	private

	# Use callbacks to share common setup or constraints between actions.
	def set_meeting_attendee
		@meeting_attendee = meeting_attendee.find(params[:id])
	end


	def meeting_attendee_params
		params.require(:meeting_attendee).permit(:name, :email, :password, :password_digest, :username, :role, :avatar, :mobile, :sex,
	                             :password_confirmation)
	end
end
