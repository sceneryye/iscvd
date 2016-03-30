#encoding:utf-8
module Admin
	class PagesController < Admin::BaseController
		layout 'admin'
		def index

			@pages = Page.all
		end
		
		def new
		    @page = Page.new
		 end

		def edit
		end

		def create
			@page = Page.new(page_params)
			if @page.save    
			    redirect_to admin_pages_path
			else
			  redirect_to new_admin_page_path
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
			  format.html { redirect_to admin_pages_url, notice: 'Page was successfully destroyed.' }
			  format.json { head :no_content }
			end
		end

		private

		# Use callbacks to share common setup or constraints between actions.
		def set_page
			@page = Page.find(params[:id])
		end


		def page_params
			params.require(:page).permit(:title, :locale, :body, :head_pics, :slug, :from, :author, :layout, :page_categories_id,:type,:meeting_id)
		end
	end
end