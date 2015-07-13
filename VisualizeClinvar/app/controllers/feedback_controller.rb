class FeedbackController < ApplicationController
  def create
    FeedbackMailer.send_feedback(params[:feedback]).deliver_now
  end
end
