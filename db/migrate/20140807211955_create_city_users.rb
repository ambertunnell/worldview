class CreateCityUsers < ActiveRecord::Migration
  def change
    create_table :city_users do |t|
      t.references :user, index: true
      t.references :city, index: true

      t.timestamps
    end
  end
end
