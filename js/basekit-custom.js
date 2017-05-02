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
  $('a[href^="#"]').smoothPageScroll();

  // Funcy font tester tool
  $('body').on('keypress',"#fontoggler", function(event){
    if (event.which == 13){
      $('body').css('font-family', $(this).val());
      $.cookie("fontoggler", '', { path: '/', expires: 1 });
      $.cookie("fontoggler", $(this).val(), { path: '/', expires: 1 });
    };
  });

  if ($.cookie("fontoggler") != undefined) {
    $('body').css('font-family', $.cookie("fontoggler"));
    $('#fontoggler').attr('value', $.cookie("fontoggler"));
  };
});
