#encoding:utf-8
class PagesController < ApplicationController
	
	def index

		category_id = params[:category]

		if category_id.blank?			
			category_id =1 # Default show News
		end

		@category = PageCategory.Find(category_id)
		@pages = Page.where(locale: session[:locale],page_category_id: category_id)

		render :edit, layout: @category.layout
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

