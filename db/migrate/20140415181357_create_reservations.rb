class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :res_id
      t.integer :nightclub_id
      t.integer :table_id
      t.datetime :reservation_date

      t.timestamps
    end
  end
end
