class ProfessionalSessionsController < ApplicationController

    skip_before_action :authorize, only: :create 

    def create
        professional = Professional.find_by(username: params[:username])
        if professional&.authenticate(params[:password])
            session[:professional_id] = professional.id
            render json: professional, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

end
