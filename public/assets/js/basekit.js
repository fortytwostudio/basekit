(function($) {
  $("#nav-primary-list").smartmenus({
    subIndicators: false,
    subMenusMinWidth: "15em",
    subMenusMaxWidth: "20em",
    collapsibleBehavior: 'accordion',
    subMenusSubOffsetX: 8,
    subMenusSubOffsetY: 10,
    showFunction: function($ul, complete) { $ul.fadeIn(250, complete); },
    rightToLeftSubMenus: true
  });
})(jQuery);