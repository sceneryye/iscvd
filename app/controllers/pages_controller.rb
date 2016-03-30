#encoding:utf-8
class PagesController < ApplicationController
	
	def index
		@pages = Page.where(locale: session[:locale])
	end

	def show
		@page  = Page.find("#{params[:id]}_#{session[:locale]}")
		render :layout=> @page.layout.present? ? @page.layout : 'application'
	end
end

