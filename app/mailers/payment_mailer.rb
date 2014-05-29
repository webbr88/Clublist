class PaymentMailer < ActionMailer::Base
  default from: "get.social.axis@gmail.com"


   def complete_reservation(payment, current_user)
    @user = current_user
    @payment = payment

  


    mail(to: @user.email, subject: "Your Reservation Confirmation for " + payment.reservation_date.strftime("%a %d %b").to_s )
  end

end
