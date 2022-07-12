class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :invalid 
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    #Make sure user is logged in before doing any other actions
    before_action :authorize 
  
    private 
  
    #Authorize user is logged in before performing anything 
    def authorize 
      if session[:user_id]
        @current_user = User.find(session[:user_id])
      elsif session[:professional_id]
        @current_user = Professional.find_by(id: session[:professional_id])
      end
      render json: {errors: ["Not authorized"]}, status: :unauthorized unless @current_user 
    end
  
    def invalid(invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def not_found 
      render json: { errors: "Not found" }, status: 404
  end
  
end
