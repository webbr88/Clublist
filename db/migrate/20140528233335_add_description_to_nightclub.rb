class AddDescriptionToNightclub < ActiveRecord::Migration
  def change
    add_column :nightclubs, :description, :text
  end
end
