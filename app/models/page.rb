class Page < ActiveRecord::Base
  belongs_to :meeting
  belongs_to :page_category
  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :body,  presence: true, length: {minimum: 2}
  validates :language, presence: true

  default_scope {order 'created_at DESC'}
end
