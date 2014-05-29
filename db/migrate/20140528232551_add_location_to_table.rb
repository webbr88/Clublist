class AddLocationToTable < ActiveRecord::Migration
  def change
    add_column :tables, :location, :text
  end
end
