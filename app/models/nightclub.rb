class Nightclub < ActiveRecord::Base
	has_many :tables
	has_many :reservations, :through => :tables
end
