require 'nokogiri'
class Email < ActiveRecord::Base
  before_save :set_img_url
  default_scope {order(created_at: :desc)}

  def set_img_url
    doc = Nokogiri::HTML(self.content)
    doc.css('img').each do |img|
      img['src'] = 'http://www.iscvd.org' + img['src']
    end
    self.content = doc
  end
end
