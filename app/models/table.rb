class Table < ActiveRecord::Base
	belongs_to :nightclub

	has_many :reservations
	has_many :users, :through => :reservations

	has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }
	validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png"]
end
