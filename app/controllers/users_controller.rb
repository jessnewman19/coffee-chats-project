class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    def index 
        render json: User.all
    end

    def show 
        render json: @current_user
    end
    
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created 
    end

    def update
        @current_user.update(user_params)
        render json: @current_user
    end

    private 
    
    def user_params 
        params.permit(:full_name, :username, :password, :password_confirmation, :industry_id, :image, :bio).select {|x,v| v.present?}
    end

end
