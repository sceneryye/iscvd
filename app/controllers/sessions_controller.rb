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
      Rails.logger.info '-------------login ok'
      if params[:from] == 'ajax'
        return render json: {msg: 'ok', id: user.id}
      else
        redirect_to user
      end
    else
      unless params[:form] == 'ajax'
        render 'new'
      end
    end
  end

  def destroy
    logout if login?
    redirect_to root_path
  end
end
