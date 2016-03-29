class UserMailer < ApplicationMailer
  default from: 'info@iscvd.org'

  def account_activation user
    @greeting = "Hi"
    @user = user
    mail to: user.email, subject: 'Account Activation'
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #
  def password_reset
    @greeting = "Hi"

    mail to: "to@example.org"
  end

  def send_group_emails(email, mail_id)
    sending_mail = Email.find(mail_id)
    subject = sending_mail.title
    @content = sending_mail.content
    mail to: email, subject: subject
  end
end
