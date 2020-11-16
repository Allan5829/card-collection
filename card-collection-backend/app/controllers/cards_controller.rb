class CardsController < ApplicationController

    def index
        cards = Card.all
        render json: cards, include: [:collection]
    end

    def create
        card = Card.new(name: params[:name], collection_id: params[:collection_id])
        if card.save
            render json: card.to_json
        end 
    end 

    def destroy
        Card.find_by(id: params[:id]).delete
    end 

end
