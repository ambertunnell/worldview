class AddLinkToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :link, :string
  end
end
