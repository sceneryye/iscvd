#encoding:utf-8
class PageCategoriesController < ApplicationController

	def index

		@page_category = PageCategory.all
	end

	def new
	    @page_category = PageCategory.new
	 end

	def edit
	end

	def create
		@page_category = PageCategory.new(Page_category_params)
		if @page_category.save    
		    redirect_to root_url
		  end
		else
		  redirect_to admin_path
		end
	end


	def update
		respond_to do |format|
		  if @page_category.update(Page_category_params)
		    format.html { redirect_to @page_category, notice: 'Page_category was successfully updated.' }
		    format.json { render :show, status: :ok, location: @page_category }
		  else
		    format.html { render :edit }
		    format.json { render json: @page_category.errors, status: :unprocessable_entity }
		  end
		end
	end


	def destroy
		@page_category.destroy
		respond_to do |format|
		  format.html { redirect_to Page_category_category_url, notice: 'Page_category was successfully destroyed.' }
		  format.json { head :no_content }
		end
	end

	private

	# Use callbacks to share common setup or constraints between actions.
	def set_page_category
		@page_category = Page_category.find(params[:id])
	end


	def page_category_params
		params.require(:Page_category).permit(:name, :email, :password, :password_digest, :username, :role, :avatar, :mobile, :sex,
	                             :password_confirmation)
	end
end
