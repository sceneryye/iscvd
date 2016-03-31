#encoding:utf-8
class DonatesController < ApplicationController
	
	def index

		@donates = Donate.all
	end

	def show
		@donate  = Donate.find(params[:id])
		render :layout=> @donate.layout.present? ? @donate.layout : 'application'
	end

	def new
	    @donate = Donate.new
	    render layout: false
	 end

	def edit
	end

	def create
		@donate = Donate.new(donate_params)
		if @donate.save    
		    redirect_to root_url
		else
		  redirect_to admin_path
		end
	end


	private

	# Use callbacks to share common setup or constraints between actions.
	def set_Donate
		@Donate = Donate.find(params[:id])
	end


	def donate_params
		params.require(:donate).permit(:title, :language, :body, :head_pics, :slug, :from, :author, :layout, :Donate_categories_id,:type,:donate_id)
	end
end

