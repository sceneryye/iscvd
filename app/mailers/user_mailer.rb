class UserMailer < ApplicationMailer
  default from: 'info@iscvd.org'

  def send_group_emails(email, mail_id)
    sending_mail = Email.find(mail_id)
    subject = sending_mail.title
    @content = sending_mail.content
    mail to: email, subject: subject
  end
end
