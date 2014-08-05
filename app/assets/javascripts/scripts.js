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

WebFontConfig = {
	google: {
		families: ['Lato:300,700', 'Roboto:100,300,300italic,500']
	}
};

(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
						'://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();

$(document).ready(function() {

  // Auto scroll on anchor links
  $("#main").localScroll({
    duration: 250,
    offset: -100
  });

  // Pageslide
  $("#menu").pageslide();
  $("#close-menu").on("click", function() {
    $.pageslide.close();
  });

  // Datepicker
  $datePicker = $("#reservation_reservation_date");
  $datePickerButton = $("#datepicker-button");
  $datePicker.datepicker();

  $("#datepicker-button").on("click", function(e) {
    e.preventDefault();

    var isOpen = $datePicker.datepicker("widget").is(":visible");

    if (isOpen === true) {
      $datePicker.datepicker("hide");
    }

    else {
      $datePicker.datepicker("show");
    }
  });

  var $tableChoice = $("#table-choice");

  var form = {

    rows: {

      select: function($el) {
        $el.addClass('selected');
        $el.find('.icon').removeClass('cocktail').addClass('check full');
        $el.find('input[type="radio"]').prop("checked", true);
      },

      deselect: function($el) {
        $selected = $tableChoice.find('.selected');
        $selected.find('.icon').removeClass('check full').addClass('cocktail');
        $selected.find('input[type="radio"]').prop("checked", false);
        $selected.removeClass('selected');
      }
    }
  }

  var noOfReveals = 0;

  // $tableChoice.find("tbody tr").on("click", function(e) {
  //
  //   // Deselect the previous row and select the new one
  //   form.rows.deselect($(this));
  //   form.rows.select($(this));
  //
  //   // Show the party-details section and scroll to it
  //   if (noOfReveals === 0) {
  //     $("#party-details").addClass("show");
  //     $.scrollTo("#party-details", {
  //       duration: 500,
  //       offset: -80
  //     });
  //
  //     noOfReveals++;
  //   }
  // });

  var profileSlider = {

    forward: function() {

      // jQuery fallback for browsers that don't support CSS Transforms
      if (Modernizr.csstransitions === true) {

        var css = {};

        css[Modernizr.prefixed("transform")] = "translateX(-" + ($profileSlider.outerWidth() + 24) + "px)";
        css[Modernizr.prefixed("transition")] = ".25s ease-in-out " + Modernizr.prefixed("transform");

        $profileSlider.css(css);
      }

      else {
        $profileSlider.animate({
          "left": "-" + ($profileSlider.outerWidth() + 24) + "px"
        }, 500);
      }
    },

    back: function() {

      // jQuery fallback for browsers that don't support CSS Transforms
      if (Modernizr.csstransitions === true) {

        var css = {};

        css[Modernizr.prefixed("transform")] = "translateX(0)";
        css[Modernizr.prefixed("transition")] = ".25s ease-in-out " + Modernizr.prefixed("transform");

        $profileSlider.css(css);
      }

      else {
        $profileSlider.animate({
          "left": 0
        }, 500);
      }
    }
  }

  $profileSlider = $("#profile-slider");

  $("#show-status").on("click", function(e) {
    e.preventDefault();

    profileSlider.forward();
  });

  $("#close-status").on("click", function(e) {
    e.preventDefault();

    profileSlider.back();
  });

  // Fancy selector for time
  $(".custom-selector").selectmenu();


  // Detect if retina is supported
  function getDisplayType() {

    if(window.getComputedStyle === undefined) {
      return "";
    }

    var displayType = window.getComputedStyle(document.body,':after').getPropertyValue('content');
    displayType = displayType.replace( /"/g,'');   // Firefox bugfix

    return displayType;
  }

  var imageType = "";
  if (getDisplayType() === "'2x'") {
    imageType = "@2x";
  }

  var introImageSrc = "/assets/backgrounds/bg-header" + imageType + ".jpg";

  // Preloader intro image
  $("body").append('<img id="intro-bg" style="display: none;" src="' + introImageSrc +'" width="1280" height="965" />');
  $introBg = $('#intro-bg');

  if(document.querySelectorAll !== undefined) {

    // When the intro image has loaded, add the "show" class which controls the fade in
    $introBg.imagesLoaded( function() {
      $introBg.remove();
      $(".header-bg").css({
        "background-image": "url(" + introImageSrc + ")"
      }).addClass("show");
    });
  }

  else {
    $(".header-bg").addClass("show");
  }



  // Club slider
  var slider = $('#slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    swipe: true,
    touchMove: false,
    touchThreshold: 20
  });


  // Front page carousel
  var carousel = $('#carousel').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipe: true,
    touchMove: false,
    touchThreshold: 20,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $("#carousel-next").on("click", function() {
    carousel.slickNext();
  });

  $("#carousel-prev").on("click", function() {
    carousel.slickPrev();
  });

  $("#slider-next").on("click", function() {
    slider.slickNext();
  });

  $("#slider-prev").on("click", function() {
    slider.slickPrev();
  });

  $(window).resize(function() {
      profileSlider.back();
      $.pageslide.close(); //close pageslide if it's open
      $("body").css('width', ''); //remove the width from the body
  });

});
