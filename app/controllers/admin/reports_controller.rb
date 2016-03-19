class Admin::ReportsController < ApplicationController
  # before_action :autheorize_admin!
  layout 'admin'
  def index
  end

  def send_group_emails
    @email_addresses = ['feng.ye@iotps.com', 'bingzhang.song@iotps.com', 'killernova.ye@iotps.com', 'starcraft_p@163.com', '24441769@qq.com']
    @emails = Email.all
    Rails.logger.info @emails.count
  end
end
