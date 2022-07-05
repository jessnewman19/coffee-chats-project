class ProfessionalsController < ApplicationController

    def index 
        render json: Professional.all
    end

end
