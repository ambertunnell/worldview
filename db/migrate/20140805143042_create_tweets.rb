class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :data

      t.timestamps
    end
  end
end
