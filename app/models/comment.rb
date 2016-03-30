class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :page, counter_cache: true

  validates :body,  presence: true
  validates :user_id,  presence: true
  default_scope {order 'created_at DESC'}
end
