$( function() {
    $('#card-number').reservation'formatCardNumber')
    $('#cvc').reservation('formatCardCVC')
    $('#exp-month, #exp-year').reservation('restrictNumeric')

    $(document).on('click', "#new_reservation [name='commit']", function( event ) {
        if( $('input[name=saved_card]:checked').val() !== 'true' ) {
	    event.preventDefault()
            var card = {
                number:   $("#card-number").val(),
                expMonth: $("#exp-month").val(),
                expYear:  $("#exp-year").val(),
                cvc:      $("#cvc").val()
            }
            
            Stripe.createToken(card, function( status, response ) {
                if (status === 200) {
                    $("[name='reservation[stripe_token]']").val(response.id)
                    $("#new_reservation").submit()
                } else {
                    $("#stripe-error-message").text(response.error.message)
                    $("#credit-card-errors").show()
                    $("#user_submit").attr("disabled", false)
                }
            } )
        }
    } )

    $("[name='saved_card']").change( function() {
        showSaved = $(this).val() === 'true'
        $('#saved_card').toggle( showSaved )
        $('#new_card').toggle( ! showSaved )
    } )
    $("[name='saved_card']").eq(0).prop( 'checked', true ).change()
} )