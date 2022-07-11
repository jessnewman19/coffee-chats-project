class ProfessionalsController < ApplicationController

    skip_before_action :authorize, only: :create

    def index 
        render json: Professional.all
    end

    def show 
        professional = Professional.find(params[:id])
        render json: :professional
    end

    def create 
        professional = Professional.create!(professional_params)
        session[:professional_id] = professional.id
        render json: professional, status: :created 
    end

    private

    def professional_params 
        params.permit(:full_name, :username, :password, :password_confirmation, :industry_id, :image, :bio).select {|x,v| v.present?}
    end

end
