/**
 * RESPONSIVE NAV JS
 * Source: http://jsfiddle.net/shanomurphy/zp376/
 * Original: http://jsfiddle.net/csswizardry/ev598/
 * =================
*/

// The target nav
var responsiveNav = document.getElementById('js-responsive-nav');

// Insert <button> element for toggle button inside the <nav> element
var toggleBtn = document.createElement('button');
    toggleBtn.setAttribute('class', 'overlay--toggle');
    toggleBtn.textContent = "Menu";
    responsiveNav.insertBefore(toggleBtn, responsiveNav.lastChild);

/* Has Class Function */
function hasClass(e,t){return(new RegExp(' '+t+' ')).test(' '+e.className+' ');}

/* Toggle Class Function */
function toggleClass(e,t){
  var n=' '+e.className.replace(/[\t\r\n]/g,' ')+' ';if(hasClass(e,t)){
    // window.setTimeout( function(){
      while(n.indexOf(' '+t+' ')>=0){
        n=n.replace(' '+t+' ',' ');
      }e.className=n.replace(/^\s+|\s+$/g,'');
    // }, 1000)
  }else{
    e.className+=' '+t;
  }
}

/* Toggle open when button is clicked */
toggleBtn.onclick = function() {
    toggleClass(this.parentNode, 'overlay  fadeIn');
    toggleClass(document.body, 'has-overlay');
    return false;
};