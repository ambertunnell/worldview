class CreateUserArticles < ActiveRecord::Migration
  def change
    create_table :user_articles do |t|
      t.references :user, index: true
      t.references :article, index: true

      t.timestamps
    end
  end
end
