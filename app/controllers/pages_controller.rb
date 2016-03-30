#encoding:utf-8
class PagesController < ApplicationController
	
	def index

		@pages = Page.all
	end

	def show
		@page  = Page.find(page_id)
	end
end
