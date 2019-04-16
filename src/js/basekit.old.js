(function($) {
  // No need to use this.
  /// Very simple class toggle for the hamburger icon
  // $('#nav-toggler').on('click', function (event) {
  //   event.preventDefault()
  //   $('#nav-toggler, #nav-primary').toggleClass('is-active');
  // });
  // $(document).click(function(event) {
  //   if (!$(event.target).closest('#nav-toggler, #nav-primary').length)  {
  //     $('#nav-toggler, #nav-primary').removeClass('is-active');
  //   }
  // });

  // Smart Menus script yo
  // https://www.smartmenus.org/docs/
  // $("#nav-primary-list").smartmenus({
  //   subIndicators: false,
  //   subMenusMinWidth: "15em",
  //   subMenusMaxWidth: "20em",
  //   collapsibleBehavior: 'accordion',
  //   subMenusSubOffsetX: -1,
  //   mainMenuSubOffsetY: 1,
  //   showFunction: function($ul, complete) { $ul.fadeIn(250, complete); },
  // });

  /// See https://github.com/kamem/jquery.smoothPageScroll
  // Smooth scroll any links with a #
  // $('a[href*="#"]').smoothPageScroll();
  // Use this option with the ^ if targetting all links with a # breaks stuff
  // $('a[href^="#"]').smoothPageScroll();
  // Pages will smooth scroll on load if # is present in URL
  // $.smoothPageScrollByLoaded();


  // $('.accordion-title').click(function() {
  //   $content = $('.accordion-content');
  //   $titles = $('.accordion-title');
  //   $this = $(this);
  //   $target = $this.next();
  //   // $target =  $this.parent().next();
  //   $easing = { duration: 600, easing: "easeInOutCubic" };
  //
  //   if($this.hasClass('accordion-active')){
  //     $this.removeClass('accordion-active');
  //   }else{
  //     $titles.removeClass('accordion-active');
  //     $this.addClass('accordion-active');
  //   }
  //
  //   if($target.hasClass('accordion-open')){
  //     $target.removeClass('accordion-open').slideUp($easing);
  //   }else{
  //     $content.removeClass('accordion-open').slideUp($easing);
  //     $target.addClass('accordion-open').slideDown($easing);
  //   }
  //   return false;
  // });
  //
  // $('.accordion-title').on('keydown', function(e) {
  //   if (e.keyCode == 13 || e.keyCode == 32) {
  //       $(this).trigger("click");
  //   }
  // });

})(jQuery);