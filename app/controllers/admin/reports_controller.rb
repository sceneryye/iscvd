class Admin::ReportsController < ApplicationController
  # before_action :autheorize_admin!
  layout 'admin'
  def index
  end

  def send_group_emails
    @emails = ['feng.ye@iotps.com', 'bingzhang.song@iotps.com', 'killernova.ye@iotps.com', 'starcraft_p@163.com', '24441769@qq.com']
  end
end
