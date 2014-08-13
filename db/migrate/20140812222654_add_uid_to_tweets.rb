class AddUidToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :uid, :bigint
  end
end
