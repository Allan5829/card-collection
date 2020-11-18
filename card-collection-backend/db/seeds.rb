# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
set_1 = Collection.create(name: "Not Listed")
set_2 = Collection.create(name: "Vivid Voltage")
set_3 = Collection.create(name: "Darkness Ablaze")
set_4 = Collection.create(name: "Rebel Clash")

card_1 = Card.create(name: "Rillaboom", collection_id: 4)
card_2 = Card.create(name: "Pikachu", collection_id: 2)
card_3 = Card.create(name: "Charizard", collection_id: 3)
card_4 = Card.create(name: "Charmander", collection_id: 3)

Card.create(name: "Allister", collection_id: 2)
Card.create(name: "Pikachu VMAX", collection_id: 2 )
Card.create(name: "Gogoat", collection_id: 2 )
Card.create(name: "Riolu", collection_id: 2 )
Card.create(name: "Zapdos", collection_id: 2 )
Card.create(name: "Orbeetle V", collection_id: 2 )
Card.create(name: "Butterfree V", collection_id: 3 )
Card.create(name: "Hippopotas", collection_id: 3 )
Card.create(name: "Swanna", collection_id: 3 )
Card.create(name: "Rare Fossil", collection_id: 3 )
Card.create(name: "Rose Tower", collection_id: 3 )
Card.create(name: "Durant", collection_id: 4 )
Card.create(name: "Malamar VMAX", collection_id: 4 )
Card.create(name: "Twin Energy", collection_id: 4 )
Card.create(name: "Vulpix", collection_id: 4 )
Card.create(name: "Mew", collection_id: 1 )
Card.create(name: "Mewtwo", collection_id: 1 )