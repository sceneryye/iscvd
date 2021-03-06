RailsOnForum::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # remove the 'Started get XXXXXX' in Rails Log
  config.after_initialize do |app|
    app.assets.logger = Logger.new('/dev/null')
  end

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  # host = 'www.iscvd.com'
  host = 'www.iscvd.org'
  config.action_mailer.default_url_options = { host: host }
  ActionMailer::Base.smtp_settings = {
      :address => 'mail.iscvd.org',
      :port => 587,
      :domain => "iscvd.org",
      :authentication => :login,
      :user_name => "info@iscvd.org",
      :password => "info2016",
      :enable_starttls_auto => true,
      :openssl_verify_mode  => 'none'
  }

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true
  # config.relative_url_root = "/foodiegroup"
end
