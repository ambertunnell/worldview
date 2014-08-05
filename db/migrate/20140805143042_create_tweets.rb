class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :title

      t.timestamps
    end
  end
end
