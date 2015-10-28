var navContainer = document.getElementById('js-rnav');
var animSpeed = 300;

var nav = responsiveNav("#js-rnav", {
  animate: false,
  transition: animSpeed,
  closeOnNavClick: true,
  navClass: "rnav",
  toggleName: "rnav-toggle",
  openPos: "",
  label: "<span class='burger-bars'>Menu</span>",
  navActiveClass: "js-has-rnav-active",
  jsClass: "js-has-rnav",

  open: function(){
    navContainer.classList.add("fadeIn");
    navContainer.classList.remove("fadeOut");
  },

  close: function(){
    navContainer.classList.add("fadeOut");
    setTimeout(function () {
      navContainer.classList.remove("fadeIn");
      navContainer.classList.remove("fadeOut");
    }, animSpeed);
  }
});