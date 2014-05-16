class AddReservationDateToPayments < ActiveRecord::Migration
  def change
    add_column :payments, :reservation_date, :datetime
  end
end
