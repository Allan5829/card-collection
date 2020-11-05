class CollectionsController < ApplicationController
    def index
        render json: { test: "success" }
    end
end
