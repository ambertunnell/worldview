class CreateUserPhotos < ActiveRecord::Migration
  def change
    create_table :user_photos do |t|
      t.references :user, index: true
      t.references :photo, index: true

      t.timestamps
    end
  end
end
