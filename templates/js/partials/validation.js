/**
 * Validate forms
 */

var errors;

var validate = {

  /**
   * Check there is atleast one person going to the party
   */
  noOfPeople: function($noOfGirls, $noOfBoys, noOfPeopleError) {

    if($noOfGirls.val() == 0 && $noOfBoys.val() == 0) {
      errors.push(noOfPeopleError);
    }
  },

  /**
   * Validate the date
   */
  date: function(date, dateError) {

    function isValidDate(date) {
      var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
      if (matches == null) return false;
      var d = matches[2];
      var m = matches[1] - 1;
      var y = matches[3];
      var composedDate = new Date(y, m, d);
      return composedDate.getDate() == d &&
              composedDate.getMonth() == m &&
              composedDate.getFullYear() == y;
    }

    if(isValidDate(date) === false) {
      errors.push(dateError);
    }
  },

  /**
   * Validate credit card number
   */
  cardNo: function(cardNo, $cardNo, cardNoError) {

    function validateCardNumber(number) {
      var regex = new RegExp("^[0-9]{16}$");
      if (!regex.test(number))
          return false;

      return luhnCheck(number);
    }

    function luhnCheck(val) {
      var sum = 0;
      for (var i = 0; i < val.length; i++) {
          var intVal = parseInt(val.substr(i, 1));
          if (i % 2 == 0) {
              intVal *= 2;
              if (intVal > 9) {
                  intVal = 1 + (intVal % 10);
              }
          }
          sum += intVal;
      }
      return (sum % 10) == 0;
    }


    // Remove spaces and hyphens
    var cleanCardNo = cardNo.replace(/[\. ,:-]+/g, "");

    // Validate the cleaned card number
    if(validateCardNumber(cleanCardNo) === false) {
      errors.push(cardNoError);
    }

    // If the credit card validates, change the input to the clean number instead
    else {
      $cardNo.val(cleanCardNo);
    }
  },

  /**
   * Validate CV number
   */
  cvNo: function(cvNo, cvNoError) {

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if(cvNo.length !== 3 || (cvNo < 100 && cvNo > 999) || !isNumeric(cvNo)) {
      errors.push(cvNoError);
    }
  },

  /**
   * Show the errors on screen
   */
  outputErrors: function(errors, $errors) {

    var $errors = $("#errors"),
        $errorsList = $errors.find("ul");

    var noOfErrors = errors.length;

    // Remove the existing list of errors, then set up a new empty list
    $errorsList.remove();
    $errors.append("<ul></ul>");
    $errorsList = $errors.find("ul");

    // Add each error to the list
    for (var i = 0; i < noOfErrors; i++) {

      var error = errors[i];

      $errorsList.append("<li>" + error + "</li>");
    }

    // Show the errors container
    $errors.addClass("show");
  }
}

$(document).ready(function() {

  var $partyForm = $("#party-form"),
      $partyForm2 = $("#party-form2"),
      $clubSubmit = $("#club-submit"),
      $clubSubmit2 = $("#club-submit2");

  var $date = $partyForm.find('input[name="date"]'),
      $noOfGirls = $partyForm.find('input[name="girls"]'),
      $noOfBoys = $partyForm.find('input[name="boys"]'),
      $cardNo = $partyForm2.find('input[name="card"]'),
      $cvNo = $partyForm2.find('input[name="cv"]'),
      dateError = $date.data("error-msg"),
      noOfPeopleError = $partyForm.find('fieldset[name="no-of-people"]').data("error-msg"),
      cardNoError = $cardNo.data("error-msg");
      cvNoError = $cvNo.data("error-msg");

  $clubSubmit.on("click", function(e) {

    errors = [];

    validate.date($date.val(), dateError);
    validate.noOfPeople($noOfGirls, $noOfBoys, noOfPeopleError);

    if (errors.length !== 0) {
      validate.outputErrors(errors);
      e.preventDefault();
    }
  });

  $clubSubmit2.on("click", function(e) {

    errors = [];

    validate.cardNo($cardNo.val(), $cardNo, cardNoError);
    validate.cvNo($cvNo.val(), cvNoError);

    if (errors.length !== 0) {
      validate.outputErrors(errors);
      e.preventDefault();
    }
  });

});
