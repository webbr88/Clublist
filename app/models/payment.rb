class Payment < ActiveRecord::Base
 	belongs_to :user
    belongs_to :table

    validates :table, uniqueness: {scope: :reservation_date, message: "Already booked"}
end
