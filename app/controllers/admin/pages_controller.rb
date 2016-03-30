#encoding:utf-8
class PagesController < ApplicationController

	def index

		@pages = Page.all
	end
	
	def new
	    @page = Page.new
	    render layout: false
	 end

	def edit
	end

	def create
		@page = Page.new(Page_params)
		if @page.save    
		    redirect_to root_url
		  end
		else
		  redirect_to admin_path
		end
	end


	def update
		respond_to do |format|
		  if @page.update(Page_params)
		    format.html { redirect_to @page, notice: 'Page was successfully updated.' }
		    format.json { render :show, status: :ok, location: @page }
		  else
		    format.html { render :edit }
		    format.json { render json: @page.errors, status: :unprocessable_entity }
		  end
		end
	end


	def destroy
		@page.destroy
		respond_to do |format|
		  format.html { redirect_to Pages_url, notice: 'Page was successfully destroyed.' }
		  format.json { head :no_content }
		end
	end

	private

	# Use callbacks to share common setup or constraints between actions.
	def set_page
		@page = Page.find(params[:id])
	end


	def page_params
		params.require(:Page).permit(:name, :email, :password, :password_digest, :username, :role, :avatar, :mobile, :sex,
	                             :password_confirmation)
	end
end
