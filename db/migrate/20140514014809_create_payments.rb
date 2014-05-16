class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.string :stripe_token
      t.float :amount
      t.references :user, index: true

      t.timestamps
    end
  end
end
