class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :invalid 

    #Make sure user is logged in before doing any other actions
    before_action :authorize 
  
    private 
  
    #Authorize user is logged in before performing anything 
  
    #Errors are in array brackets so they can be parsed by the front end
  
    def authorize 
      @current_user = User.find_by(id: session[:user_id])
      render json: {errors: ["Not authorized"]}, status: :unauthorized unless @current_user 
    end
  
    def invalid(invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
  
end
