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
