#encoding:utf-8
#require "iconv"
#require 'axlsx'

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


 def export
    	
  attendees = MeetingAttendee.all
   
          package = Axlsx::Package.new
          workbook = package.workbook

            workbook.styles do |s|


          workbook.add_worksheet(:name => "attendeesinfo") do |sheet|

          sheet.add_row [" 邮箱","报名名字","名字","手机","地址","活动名称"]
                     

            row_count=0




            attendees.each do |attendee| 
              email=attendee.email
              fullname=attendee.user.full_name
              name=attendee.name
              mobile=attendee.user.mobile
              address=attendee.user.address 
              meetname=attendee.meetings.title_zh
          
          
              sheet.add_row [email,fullname,name,mobile,address,meetname]
              row_count +=1
            end
           end
          send_data package.to_stream.read,:filename=>"order_#{Time.zone.now.strftime('%Y%m%d%H%M%S')}.xlsx"
          end
      end


	end
end
