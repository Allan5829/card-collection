class CollectionsController < ApplicationController
    def index
        sets = Collection.all
        render json: sets 
    end
end
