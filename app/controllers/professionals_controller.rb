class ProfessionalsController < ApplicationController

    def index 
        render json: Professional.all
    end

    def show 
        professional = Professional.find(params[:id])
        render json: :professional
    end
end
