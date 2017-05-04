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
  // Smooth scroll any links with a #
  $('a[href*="#"]').smoothPageScroll();
  // Use this option with the ^ if targetting all links with a # breaks stuff
  // $('a[href^="#"]').smoothPageScroll();
  // Pages will smooth scroll on load if # is present in URL
  // $.smoothPageScrollByLoaded();

  // FONTOGGLER
  var fontogNotice = '<div class="fontoggler__notice inline-block font-s" style="position:fixed;top:0.25rem;right:0.25rem;z-index:900;"><a data-bk-layout="pad:small" class="btn" href="/demo/reference/typography/#fontoggler">Custom font active</a></div>';
  // When the enter key is pressed…
  $('body').on('keypress',"#fontoggler", function(event){
    if (event.which == 13){
      // Set the body style font-family to whatever the value is and prepend the font notice
      $('body').css('font-family', $(this).val()).prepend(fontogNotice);
      // Empty the cookie
      $.cookie("fontoggler", '', { path: '/', expires: 1 });
      // Set the cookie to the entered value
      $.cookie("fontoggler", $(this).val(), { path: '/', expires: 1 });
      // If the cookie empty remove the notice
      if ($.cookie("fontoggler") == '') {
        $(".fontoggler__notice").remove();
      }
    };
  });

  if ($.cookie("fontoggler") != undefined && $.cookie("fontoggler") != "") {
    // Based on the cookie set the body font style and prepend the font notice
    $('body').css('font-family', $.cookie("fontoggler")).prepend(fontogNotice);
    // Add the value into the text field
    $('#fontoggler').attr('value', $.cookie("fontoggler"));
  };
});
