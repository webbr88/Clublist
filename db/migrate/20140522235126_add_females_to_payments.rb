class AddFemalesToPayments < ActiveRecord::Migration
  def change
    add_column :payments, :females, :integer
  end
end
