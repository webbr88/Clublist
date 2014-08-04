class AddNightclubIdToPayments < ActiveRecord::Migration
  def change
    add_column :payments, :nightclub_id, :integer
  end
end
