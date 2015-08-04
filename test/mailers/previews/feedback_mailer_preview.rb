# Preview all emails at http://localhost:3000/rails/mailers/feedback_mailer
class FeedbackMailerPreview < ActionMailer::Preview
  def send_feedback_preview
    params = { name: "John", email: "example@email.com", phone: "(803) 111-1111", institution: "MUSC", comment: "This rocks!" }
    FeedbackMailer.send_feedback params
  end
end
