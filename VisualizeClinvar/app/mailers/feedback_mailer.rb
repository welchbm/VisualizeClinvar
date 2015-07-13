class FeedbackMailer < ApplicationMailer
  default from: "visualizeclinvar@gmail.com", to: "visualizeclinvar@gmail.com"

  def send_feedback(params)
    @params = params
    mail(subject: "Feedback from #{params[:name]}")
  end
end
