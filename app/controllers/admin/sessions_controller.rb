#encoding:utf-8
class Admin::SessionsController < Admin::BaseController
  skip_before_filter :authorize_admin!, :except=>[:destroy]

  def new
  	redirect_to after_admin_sign_in_path if admin_signed_in?
  end

  def create
  	email  = params[:session][:email]
  	password = params[:session][:password]
    admin =  User.admin_authenticate(email,password)
   #  if admin
   #          admin_sign_in admin
  	# 	redirect_to after_admin_sign_in_path
  	# else
  	# 	redirect_to new_admin_session_path,:notice=>"用户名或密码错误"
  	# end
    redirect_to after_admin_sign_in_path
  end
  	
  def destroy
  	admin_sign_out
  	redirect_to new_admin_session_path
  end

end
