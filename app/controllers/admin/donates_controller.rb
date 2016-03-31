#encoding:utf-8
module Admin
	class DonatesController < Admin::BaseController
		layout 'admin'
		def index

			@donates = Donate.all
		end
		
		def show
		    @donate = Donate.find(params[:id])
		 end
		
	end
end