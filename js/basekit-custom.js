$(function () {
    /// Very simple class toggle for the hamburger icon
    $('#nav-toggler').on('click', function () {
        $('#nav-toggler, #nav-primary').toggleClass('is-active');
    });

    // Smart Menus script yo
    // https://www.smartmenus.org/docs/
    $("#nav-primary-list").smartmenus({
      subIndicators: false,
      subMenusMinWidth: "15em",
      subMenusMaxWidth: "20em",
      collapsibleBehavior: 'accordion',
      // showOnClick: true,
      // subMenusSubOffsetX: -10,
    });

    /// See https://github.com/kamem/jquery.smoothPageScroll
    // Smooth scroll any links with a #
    $('a[href*="#"]').smoothPageScroll();
    // Use this option with the ^ if targetting all links with a # breaks stuff
    // $('a[href^="#"]').smoothPageScroll();
    // Pages will smooth scroll on load if # is present in URL
    // $.smoothPageScrollByLoaded();
});
