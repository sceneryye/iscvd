class PageCategory < ActiveRecord::Base
  has_many :pages, dependent: :destroy
  validates :name, presence: true, uniqueness: true
end
