class CollectionsController < ApplicationController
    def index
        sets = Collection.all
        render json: sets, include: [:cards]
    end

    def show
        set = Collection.find_by(id: params[:id])
        render json: set, include: [:cards]
    end 
end
