class Payment < ActiveRecord::Base
 	belongs_to :user
    belongs_to :table

    validates :table, uniqueness: {scope: :reservation_date, message: "Already booked"}
     validate :reservation_date_cannot_be_in_the_past


     def reservation_date_cannot_be_in_the_past
    if reservation_date.present? && reservation_date < Date.today
      errors.add(:reservation_date, "can't be in the past")
    end
  end

end
