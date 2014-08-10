class AddAttributesToCity < ActiveRecord::Migration
  def change
    add_column :cities, :bigger_thing, :string
    add_column :cities, :lon, :float
    add_column :cities, :lat, :float
    add_column :cities, :country, :string
  end
end
