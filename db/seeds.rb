# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

puts "Creating default cities"

City.create(name: "New York City", bigger_thing: "New York", lon: -73.997009, lat: 40.750134, country: "US")
City.create(name: "Sydney", bigger_thing: "Australia", lon: 151.179993, lat: -33.950001, country: "AU")
City.create(name: "London", bigger_thing: "United Kingdom", lon: -0.45, lat: 51.48, country: "GB")
City.create(name: "Hong Kong", bigger_thing: "China", lon: 113.914719, lat: 22.308889, country: "CN")
City.create(name: "Paris", bigger_thing: "France", lon: 2.333333, lat: 48.866665, country: "FR")

puts "Seeding complete!"