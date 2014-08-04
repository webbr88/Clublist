class AddMalesToPayments < ActiveRecord::Migration
  def change
    add_column :payments, :males, :integer
  end
end
