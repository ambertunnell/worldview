class CreateUserTweets < ActiveRecord::Migration
  def change
    create_table :user_tweets do |t|
      t.references :user, index: true
      t.references :tweet, index: true

      t.timestamps
    end
  end
end
