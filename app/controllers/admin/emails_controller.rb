class Admin::EmailsController < ApplicationController
  layout 'admin1'
  before_action :set_email, only: [:show, :edit, :destroy]

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
  end

  def destroy
  end

  private

  def email_params
    params.require(:email).permit(:title, :content)
  end

  def set_email
    @email = Email.find_by(id: params[:id])
  end
end