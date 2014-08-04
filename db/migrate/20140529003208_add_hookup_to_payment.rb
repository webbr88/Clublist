class AddHookupToPayment < ActiveRecord::Migration
  def change
    add_column :payments, :hookup, :integer
  end
end
