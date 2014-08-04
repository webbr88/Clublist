class AddDescriptionToTable < ActiveRecord::Migration
  def change
    add_column :tables, :description, :text
  end
end
