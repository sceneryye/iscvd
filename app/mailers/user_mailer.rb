class UserMailer < ApplicationMailer
  default from: 'info@iscvd.org'

  def account_activation user
    @greeting = "Hi"
    @user = user
    mail to: user.email, subject: 'Account Activation'
    Maillog.create(sending_type: 'account_activation', users: 'user.email')
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #
  def password_reset user
    @greeting = "Hi"
    @user = user
    mail to: user.email, subject: 'Password Reset'
    Maillog.create(sending_type: 'password_reset', users: 'user.email')
  end

  def send_group_emails(email, mail_id, last)
    sending_mail = Email.find(mail_id)
    subject = sending_mail.title
    @content = sending_mail.content
    mail to: email, subject: subject
    if last == 'ture'
      Maillog.create(sending_type: 'send_group_emails', users: 'All Users', email_id: mail_id)
    end
  end
end
