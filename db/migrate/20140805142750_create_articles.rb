class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string   :title
      t.text     :abstract
      t.string   :url
      t.string   :byline
      t.datetime :pubdate

      t.timestamps
    end
  end
end
