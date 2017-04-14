$(function() {
  /// Very simple class toggle for the hamburger icon
  $('#nav-toggler').on('click', function() {
    $('#nav-toggler, #site-nav').toggleClass('is-active');
  });

  /// Almost certainly going to switch to https://www.smartmenus.org/ (used on PIM)
  $("#site-nav").accessibleMegaMenu({
    openDelay: 400 // open delay when opening menu via mouseover
  });

  /// See https://github.com/kamem/jquery.smoothPageScroll
  /// Uncomment the next line if you want pages to smooth scroll on load if # is present in URL
  // $.smoothPageScrollByLoaded();
  /// Basic config with Add Hash disabled
  $('a[href^="#"]').smoothPageScroll({
    isAddHash: false
  });
});