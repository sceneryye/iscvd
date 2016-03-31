#encoding:utf-8
require 'rest-client'
class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
  end


  def show
  end

  def new
    @user = User.new
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    if @user.save
      UserMailer.account_activation(@user).deliver_now
      flash[:info] = "Please check your email to activate your account."
      if @user.activated?
        log_in @user
        params[:session][:remember_me] == '1' ? remember(@user) : forget(@user)
        redirect_to user_path(@user, msg: '请去邮箱激活您的账号!')
      else
        message = "Account not activated. "
        message += "Check your email for the activation link."
        flash[:warning] = message
        redirect_to root_url
      end
    else
      redirect_to root_path
    end
  end


  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end


  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def send_sms_validate_code
    phone = params[:mobile]
    return render text: 'mobile number is empty' if phone.empty?
    post_url = 'http://222.73.117.158:80/msg/HttpBatchSendSM'
    code = "尊敬的用户，您注册的密码为#{rand(100000).to_s.ljust(6, '0')}, 请妥善保管，感谢您的注册！"
    var = {code: code}.to_json
    post_hash = {account: 'jiekou-clcs-10', pswd: 'Tch788788', mobile: phone, msg: code, needstatus: true}
    res_code_json = RestClient.get post_url, {params: post_hash}
    Rails.logger.info res_code_json
    return render json: res_code_json
    res_code_hash = ActiveSupport::JSON.decode res_code_json
    res_code_hash[:rand_code] = code
    code_json = res_code_hash.to_json
    return render json: code_json
  end

  def send_emails
    email = params[:email]
    id = params[:email_id]
    (UserMailer.send_group_emails email, id).deliver_now
    render json: {len: params[:len]}.to_json
  end


  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_digest, :full_name, :role, :avatar, :mobile, :sex,
                                 :password_confirmation)
  end
end
