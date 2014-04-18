class Table < ActiveRecord::Base
	belongs_to :nightclub

	has_many :reservations
	has_many :users, :through => :reservations
end
