(function($) {
  $("#nav-primary-list").smartmenus({
    subIndicators: false,
    subMenusMinWidth: "15em",
    subMenusMaxWidth: "20em",
    collapsibleBehavior: 'accordion',
    subMenusSubOffsetX: -1,
    mainMenuSubOffsetY: 1,
    showFunction: function($ul, complete) { $ul.fadeIn(250, complete); }
  });
})(jQuery);