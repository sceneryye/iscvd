class Admin::ReportsController < ApplicationController
  # before_action :autheorize_admin!
  layout 'admin'
  def index
  end

  def send_group_emails
    @email_addresses = User.whehere(activated: true).pluck(:email)
    @emails = Email.all
    Rails.logger.info @emails.count
  end
end
