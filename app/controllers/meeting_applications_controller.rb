class MeetingApplicationsController < ApplicationController
    
    before_action :find_meeting_app, only: [:show]

    def create
        meeting_app = MeetingApplication.create!(meeting_app_params)
        render json: meeting_app, status: :created
    end
    
    def index
        render json: MeetingApplication.all, status: :ok
    end
    
    def show
        render json: @meeting_app, status: :ok
    end
    
    private
    
    def find_meeting_app
        @meeting_app = MeetingApplication.find(params[:id])
    end
    
    def meeting_app_params
        params.permit(:meeting_id, :user_id, :isApproved)
    end
end
