class Admin::EmailsController < ApplicationController
  layout 'admin'
  before_action :set_email, only: [:show, :edit, :destroy, :update]

  def new
    @email = Email.new
  end

  def create
    @email = Email.new(email_params)
    if @email.save
      redirect_to admin_email_path(@email)
    else
      render @email
    end
  end

  def edit
  end

  def update
    if @email.update_attributes(email_params)
      redirect_to @email
    else
      render 'edit'
    end
  end


  def destroy
    @email.destroy
    redirect_to admin_emails_path
  end

  def index
    @emails = Email.all
    @email_addresses = User.all.pluck(:email)
  end

  private

  def email_params
    params.require(:email).permit(:title, :content)
  end

  def set_email
    @email = Email.find_by(id: params[:id])
  end

end