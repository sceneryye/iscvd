#encoding:utf-8
class ApplicationController < ActionController::Base
  include SessionsHelper
  protect_from_forgery with: :exception
  helper_method :signed_in?, :current_user,:forum_id

  before_action :set_locale


  private

  def set_locale
    # 可以將 ["en", "zh-TW"] 設定為 VALID_LANG 放到 config/environment.rb 中
    if params[:locale] && I18n.available_locales.include?( params[:locale].to_sym )
      session[:locale] = params[:locale]
    end

    I18n.locale = session[:locale] || I18n.default_locale
  end

  def login(user)
    session[:user_id] = user.id
    if user.local=='zh'
      session[:locale]='zh'
    else
      session[:locale]='en'
    end
    
  end

  

  def logout
    session[:user_id] = nil
  end

  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
    #@current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def forum_id
    if session[:locale]=='en'
      @forum_id=2
    else
      @forum_id=1
    end
  end

  def signed_in?
    current_user
  end

  def validate_user!
    unless signed_in?
      redirect_to login_url, alert: '请先登录！'
    end
  end

  def validate_permission!(user)
    unless current_user == user || is_admin?
      redirect_to root_url, alert: '很抱歉您没有权限操作!'
    end
  end

  def to_label_xml hash
    params_str = ''
    hash.each do |key, value|
      params_str += "<#{key}>" + "<![CDATA[#{value}]]>" + "</#{key}>"
    end
    params_xml = '<xml>' + params_str + '</xml>'
  end

  def random_str str_length
    arr = ('0'..'9').to_a + ('a'..'z').to_a
    nonce_str = ''
    str_length.times do
      nonce_str += arr[rand(36)]
    end
    nonce_str
  end

end
