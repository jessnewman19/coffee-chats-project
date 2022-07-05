class UsersController < ApplicationController
    #User can create login before authorizing credentials
    skip_before_action :authorize, only: :create

    def index 
        render json: User.all
    end
    
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created 
    end

    #Finds user by id saved in session hash
    #@current_user defined in the application controller
    def show 
        render json: @current_user
    end

    def update 
        @current_user.update(update_params)
        render json: @current_user
    end

    private 
    
    def user_params 
        params.permit(:full_name, :username, :password, :password_confirmation, :industry_id, :image, :bio)
    end

    def update_params 
        params.permit(:id, :bio, :username, :industry_id)
    end

end
