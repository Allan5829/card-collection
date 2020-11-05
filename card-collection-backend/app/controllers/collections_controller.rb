class CollectionsController < ApplicationController
    def index
        sets = Collection.all
        render json: sets, include: [:cards]
    end
end
