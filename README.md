# card-collection

This application is a card collection tracker that allows the user to add a new card to an existing collection as well as delete any card from any collection. There’s also the option to view all cards with the ability to sort and filter with the available selections. This application was inspired by the creator’s hobby of collecting cards.

## Installation

To use this application, clone the repository, cd into the backend directory, and bundle install.

    $ cd card-collection-backend/
    $ bundle install

## Usage

Run migrations and if you would like to have example data to play around with there is seed data included. Find the index.html file in the frontend folder and open with your preffered browser.

    $ rake db:migrate
    $ rake db:seed
    $ rails server 

## How to use?

Relatively straightforward, however there is a more detailed description below for those who wish to see it.

Choose a collection, type a card name, and click Add Card, to add a new card to the selected collection. To delete a card click the X next to the respective card's name. Click View All Cards to see a list of each card without it's collection. You can select various options to sort and filter cards and click Apply to see. Click View All Collections to go back to the previous view with collections.

There is seed data provided however there currently isn’t a feature to create new collections so if anyone decided to use custom data make sure to include some collection seed data. The current seed data uses cards from Pokémon but can be changed for other types of cards as well.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/Allan5829/card-collection. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The application is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).