$(function () {
    /// Very simple class toggle for the hamburger icon
    $('#nav-toggler').on('click', function (event) {
      event.preventDefault()
      $('#nav-toggler, #nav-primary').toggleClass('is-active');
    });
    $(document).click(function(event) {
      if (!$(event.target).closest('#nav-toggler, #nav-primary').length)  {
        $('#nav-toggler, #nav-primary').removeClass('is-active');
      }
    });

    /// Very simple filter menu toggler
    // $('#filter-toggler').on('click', function (event) {
    //   event.preventDefault()
    //   $('#filter-menu, #filter-toggler').toggleClass('filter-is-active');
    // });
    // $(document).click(function(event) {
    //   if (!$(event.target).closest('#filter-menu, #filter-toggler').length)  {
    //     $('#filter-menu, #filter-toggler').removeClass('filter-is-active');
    //   }
    // });

    // Smart Menus script yo
    // https://www.smartmenus.org/docs/
    $("#nav-primary-list").smartmenus({
      subIndicators: false,
      subMenusMinWidth: "15em",
      subMenusMaxWidth: "20em",
      collapsibleBehavior: 'accordion',
      subMenusSubOffsetX: -1,
      mainMenuSubOffsetY: 1,
      showFunction: function($ul, complete) { $ul.fadeIn(250, complete); },
    });

    /// See https://github.com/kamem/jquery.smoothPageScroll
    // Smooth scroll any links with a #
    $('a[href*="#"]').smoothPageScroll();
    // Use this option with the ^ if targetting all links with a # breaks stuff
    // $('a[href^="#"]').smoothPageScroll();
    // Pages will smooth scroll on load if # is present in URL
    // $.smoothPageScrollByLoaded();
});