class AddMalesToReservations < ActiveRecord::Migration
  def change
    add_column :reservations, :males, :integer
  end
end
