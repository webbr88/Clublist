class CreateNightclubs < ActiveRecord::Migration
  def change
    create_table :nightclubs do |t|
      t.string :name
      t.text :address
      t.string :phone_number

      t.timestamps
    end
  end
end
