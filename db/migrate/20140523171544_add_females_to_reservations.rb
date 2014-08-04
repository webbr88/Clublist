class AddFemalesToReservations < ActiveRecord::Migration
  def change
    add_column :reservations, :females, :integer
  end
end
