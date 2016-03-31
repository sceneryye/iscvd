#encoding:utf-8
module Admin
	class PageCategoriesController < Admin::BaseController
		layout 'admin'

		before_action :set_page_category, only: [:edit, :update, :destroy]

		def index
			@page_categories = PageCategory.all
		end

		def new
		    @page_category = PageCategory.new
		 end

		def edit() end

		def create
			@page_category = PageCategory.new(page_category_params)
			if @page_category.save    
			    redirect_to admin_page_categories_path
			else
			  redirect_to new_admin_page_category_path
			end
		end

		def update
			respond_to do |format|
			  if @page_category.update(page_category_params)
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
			@page_category = PageCategory.find(params[:id])
		end


		def page_category_params
			params.require(:page_category).permit(:name,:layout,:type)
		end
	end
end