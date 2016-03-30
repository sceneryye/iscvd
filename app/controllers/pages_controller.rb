#encoding:utf-8
class PagesController < ApplicationController
	
	def index

		@pages = Page.all
	end

	def show
		@page  = Page.find(params[:id])
		render :layout=> @page.layout.present? ? @page.layout : 'application'
	end
end

