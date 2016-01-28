class Groupbuy < ActiveRecord::Base
	belongs_to :user
	belongs_to :logistic
	
	has_many :participants, dependent: :destroy
	has_many :comments, dependent: :destroy
	has_many :photos, :inverse_of => :groupbuy, :dependent => :destroy
	accepts_nested_attributes_for :photos, allow_destroy: true

	validates :body,  length: {in: 5..5000}
	validates :title,  presence: true
	validates :end_time, presence: true
	validates :start_time, presence: true
	validates :goods_unit,  presence: true
	validates :price,  presence: true
	validates :goods_minimal,  presence: true
	#validates :pic_url, presence: true

 	default_scope {order 'recommend DESC, created_at DESC'}

 	

end
