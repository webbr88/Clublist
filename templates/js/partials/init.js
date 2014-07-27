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
  $datePicker = $("#datepicker");
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

  $tableChoice.find("tbody tr").on("click", function(e) {

    // Deselect the previous row and select the new one
    form.rows.deselect($(this));
    form.rows.select($(this));

    // Show the party-details section and scroll to it
    if (noOfReveals === 0) {
      $("#party-details").addClass("show");
      $.scrollTo("#party-details", {
        duration: 500,
        offset: -80
      });

      noOfReveals++;
    }
  });

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

  var introImageSrc = "images/backgrounds/bg-header" + imageType + ".jpg";

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
