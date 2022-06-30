class IndustriesController < ApplicationController

    skip_before_action :authorize 

    def index 
        render json: Industry.all 
    end

    def show 
        industry = Industry.find(params[:industry_id])
        render json: :industry 
    end
    
end
