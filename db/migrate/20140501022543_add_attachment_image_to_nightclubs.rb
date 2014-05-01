class AddAttachmentImageToNightclubs < ActiveRecord::Migration
  def self.up
    change_table :nightclubs do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :nightclubs, :image
  end
end
