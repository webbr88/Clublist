class AddUserIdToNightclubs < ActiveRecord::Migration
  def change
    add_column :nightclubs, :user_id, :integer
  end
end
