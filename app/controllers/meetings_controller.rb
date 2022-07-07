class MeetingsController < ApplicationController

    def index 
        render json: Meeting.all
    end

    def show 
        meeting = Meeting.find(params[:id])
        render json: :meeting
    end
    
    def create
        new_meeting = @current_user.meetings.create!(meeting_params)
        render json: new_meeting, status: :created
    end

    private 

    def meeting_params
        params.permit(:meeting, :professional_id)
    end 

end