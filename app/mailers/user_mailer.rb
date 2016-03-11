class UserMailer < ApplicationMailer
  default from: 'info@iscvd.org'
  def send_group_emails email, subject = 'How are you?', content = "how are you? it's a test!"
      @content = content
      mail to: email, subject: subject
  end
end
