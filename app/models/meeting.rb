class Meeting < ActiveRecord::Base

	extend FriendlyId
	
	friendly_id :url, :use => [:slugged, :finders]

	has_many :meeting_attendees, dependent: :destroy
	has_many :pages, dependent: :destroy

	validates :title_en,  presence: true
	validates :title_zh,  presence: true
	validates :end_time, presence: true
	validates :start_time, presence: true
	validates :slug, presence: true
	validates :location_en, presence: true
	validates :location_zh, presence: true


	default_scope {order 'created_at DESC'}

	def meeting_duration
		seconds = end_time.to_i - start_time.to_i
		days = seconds / 3600 / 24
		hours = seconds / 3600 % 24
		minutes = seconds / 60 % 60
		[days.to_s, hours.to_s, minutes.to_s]
	end
end
