class AddUidToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :uid, :integer
  end
end
