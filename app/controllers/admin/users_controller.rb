#encoding:utf-8
module Admin
	class UsersController < Admin::BaseController
		layout 'admin'
		def index

			@users = User.all
		end
		
		def show
		    @user = User.find(params[:id])
		 end
		
	end
end