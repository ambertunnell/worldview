class ChangeDatatypeOnTweets < ActiveRecord::Migration
  def change
    change_column :tweets, :data, :text, :limit => nil
  end
end
