class CreateTables < ActiveRecord::Migration
  def change
    create_table :tables do |t|
      t.integer :nightclub_id
      t.integer :min_cost

      t.timestamps
    end
  end
end
