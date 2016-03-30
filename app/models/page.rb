class Page < ActiveRecord::Base
	extend FriendlyId
	
	friendly_id :url, :use => [:slugged, :finders]
	
	belongs_to :meeting
	belongs_to :page_category
	has_many :comments, dependent: :destroy

	validates :title, presence: true
	validates :body,  presence: true, length: {minimum: 2}
	validates :locale, presence: true

	default_scope {order 'created_at DESC'}
end
