class AddAttachmentImageToTables < ActiveRecord::Migration
  def self.up
    change_table :tables do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :tables, :image
  end
end
