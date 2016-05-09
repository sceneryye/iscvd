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
	 end

	def edit
	end

	def create
		@donate = Donate.new(donate_params)
		if @donate.save    
		    redirect_to root_url
		else
		  render 'new'
		end
	end


	private

	# Use callbacks to share common setup or constraints between actions.
	def set_Donate
		@Donate = Donate.find(params[:id])
	end


	def donate_params
		params.require(:donate).permit(:amount,:full_name)
	end
end

