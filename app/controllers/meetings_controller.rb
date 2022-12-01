class MeetingsController < ApplicationController

    skip_before_action :authorize 

    def index 
        render json: Meeting.all
    end

    def show 
        meeting = Meeting.find(params[:id])
        render json: :meeting
    end

    def update 
        meeting = Meeting.find(params[:id])
        meeting.update(meeting_params)
        render json: meeting
    end
    
    def create
        if session[:user_id]
            @current_user = User.find_by(id: session[:user_id])
          elsif session[:professional_id]
            @current_user = Professional.find_by(id: session[:professional_id])
        end
        new_meeting = @current_user.meetings.create!(meeting_params)
        render json: new_meeting, status: :created
    end

    def destroy
        meeting = Meeting.find(params[:id])
        meeting.destroy
        head :no_content
    end

    private 

    def meeting_params
        params.permit(:meeting_date, :meeting_time, :professional_id, :is_approved)
    end 

end