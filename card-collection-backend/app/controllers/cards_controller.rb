class CardsController < ApplicationController

    def index
        cards = Card.all
        render json: cards
    end

    def create
        card = Card.create(
            name: params[:name],
            collection_id: params[:collection_id])
        
        render json: card.to_json
    end 

end
