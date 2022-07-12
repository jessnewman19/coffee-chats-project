class MeetingsController < ApplicationController

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