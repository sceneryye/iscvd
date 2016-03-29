#encoding:utf-8
class SessionsController < ApplicationController
  def new
    render layout: false
  end

  def create
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticate(params[:session][:password])
      login user
      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
      flash[:success] = '您已成功登录!'
      redirect_to user
    else
      render 'new'
    end
  end

  def destroy
    logout if login?
    redirect_to root_path
  end
end
