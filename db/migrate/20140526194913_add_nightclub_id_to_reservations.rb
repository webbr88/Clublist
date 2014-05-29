class AddNightclubIdToReservations < ActiveRecord::Migration
  def change
    add_column :reservations, :nightclub_id, :integer
  end
end
