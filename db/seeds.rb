# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
puts "Creating users"

@user1 = User.create(name: "User 1")
@user2 = User.create(name: "User 2")
@user3 = User.create(name: "User 3")

# puts "Creating articles"

# @article1 = Article.create(
#      title: "Article 1 Title",
#   abstract: "article 1 abstract article 1 abstract article 1 abstract article 1 abstract article 1 abstract article 1 abstract article 1 abstract article 1 abstract ",
#        url: "http://www.storyplace.com/article1",
#     source: "http://www.storyplace.com",
#       date: "2013-08-20"
#   )

# @article2 = Article.create(
#      title: "Article 2 Title",
#   abstract: "article 2 abstract article 2 abstract article 2 abstract article 2 abstract article 2 abstract article 2 abstract article 2 abstract article 2 abstract ",
#        url: "http://www.articlesource.com/article2",
#     source: "http://www.articlesource.com",
#       date: "2010-04-10"
#   )

# @article3 = Article.create(
#      title: "Article 3 Title",
#   abstract: "article 3 abstract article 3 abstract article 3 abstract article 3 abstract article 3 abstract article 3 abstract article 3 abstract article 3 abstract ",
#        url: "http://www.newsy.com/article3",
#     source: "http://www.newsy.com",
#       date: "2007-02-08"
#   )

# @article4 = Article.create(
#      title: "Article 4 Title",
#   abstract: "article 4 abstract article 4 abstract article 4 abstract article 4 abstract article 4 abstract article 4 abstract article 4 abstract article 4 abstract ",
#        url: "http://www.bigexclusive.com/article4",
#     source: "http://www.bigexclusive.com",
#       date: "1990-05-01"
#   )

# @article5 = Article.create(
#      title: "Article 5 Title",
#   abstract: "article 5 abstract article 5 abstract article 5 abstract article 5 abstract article 5 abstract article 5 abstract article 5 abstract article 5 abstract ",
#        url: "http://www.lolstuff.com/article5",
#     source: "http://www.lolstuff.com",
#       date: "2012-01-23"
#   )

# puts "Assigning articles to users"

# @user1.articles = [@article1, @article3, @article5]
# @user2.articles = [@article2, @article3, @article4]
# @user3.articles = [@article2, @article5, @article1, @article3]

# puts "Saving users"

# @user1.save
# @user2.save
# @user3.save

puts "Seeding complete!"

