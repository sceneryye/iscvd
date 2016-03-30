#encoding:utf-8
class ApplicationController < ActionController::Base
  include SessionsHelper
	before_action :set_locale

	def set_locale
	    if params[:locale] && I18n.available_locales.include?( params[:locale].to_sym )
	      session[:locale] = params[:locale]
	    end
	    session[:locale] ||= 'zh'
	    Rails.logger.info "--------#{session[:locale]}"

	    I18n.locale = session[:locale] || I18n.default_locale
	end

end
