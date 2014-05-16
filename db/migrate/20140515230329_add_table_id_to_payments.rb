class AddTableIdToPayments < ActiveRecord::Migration
  def change
    add_column :payments, :table_id, :integer
  end
end
