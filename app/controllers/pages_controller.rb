#encoding:utf-8
class PagesController < ApplicationController
	
	def index
		@pages = Page.where(locale: session[:locale])
	end

	def show
		id = params[:id]
		if session[:locale] !='en'
			id ="#{id}_#{session[:locale]}"
		end
		@page  = Page.find(id)
		render :layout=> @page.layout.present? ? @page.layout : 'application'
	end
end

