/*!
 * jquery.smoothPageScroll (2016-9-2)
 * Performs a smooth page scroll to an anchor on the same page.
 * https://github.com/kamem/jquery.smoothPageScroll.git
 * (c) 2016 kamem (@kamem)
 *
 * @version 0.2.0
 * @license Released under the MIT license
 * @author kamem
 */
(function (global, factory) {
  if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'), global);
  } else if (typeof define === 'function' && define.amd) {
      define(['jquery'], function() {factory($, global)});
  }  else {
    factory($, global);
  }
} (typeof window !== "undefined" ? window : this, function ($, global) {
;(function() {
var smoothPageScroll_Scroll = {}, jquerysmoothPageScrolljs;
smoothPageScroll_Scroll = function (exports) {
  Object.defineProperty(exports, '__esModule', { value: true });
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var $STAGE = $('html,body');
  var scrollStop = exports.scrollStop = function scrollStop() {
    return $STAGE.queue([]).stop();
  };
  var Scroll = exports.Scroll = function () {
    function Scroll(_ref) {
      var _ref$easing = _ref.easing;
      var easing = _ref$easing === undefined ? 'easeOutQuart' : _ref$easing;
      var _ref$speed = _ref.speed;
      var speed = _ref$speed === undefined ? 1000 : _ref$speed;
      var _ref$delay = _ref.delay;
      var delay = _ref$delay === undefined ? 0 : _ref$delay;
      var _ref$isAddHash = _ref.isAddHash;
      var isAddHash = _ref$isAddHash === undefined ? true : _ref$isAddHash;
      var _ref$isTopScroll = _ref.isTopScroll;
      var isTopScroll = _ref$isTopScroll === undefined ? true : _ref$isTopScroll;
      var _ref$isLeftScroll = _ref.isLeftScroll;
      var isLeftScroll = _ref$isLeftScroll === undefined ? true : _ref$isLeftScroll;
      _classCallCheck(this, Scroll);
      this.easing = easing;
      this.speed = speed;
      this.delay = delay;
      this.isAddHash = isAddHash;
      this.isTopScroll = isTopScroll;
      this.isLeftScroll = isLeftScroll;
    }
    _createClass(Scroll, [
      {
        key: 'getScrollPosition',
        value: function getScrollPosition(target) {
          var isPositionHash = typeof target === 'string' && isFinite(parseInt(target.slice(1, 2)));
          var position = isPositionHash ? target.slice(1).split(',') : $(target).offset();
          return {
            scrollTop: !target ? 0 : isPositionHash ? parseInt(position[1]) : position.top,
            scrollLeft: !target ? 0 : isPositionHash ? parseInt(position[0]) : position.left
          };
        }  //Last resort for the difference of each browser
      },
      {
        key: 'getWindowSize',
        value: function getWindowSize() {
          var element = document.createElement('p');
          var body = $('body')[0];
          element.style.backgroundColor = 'fixed';
          element.style.width = element.style.height = '100%';
          body.appendChild(element);
          var clientWidth = element.clientWidth;
          var clientHeight = element.clientHeight;
          body.removeChild(element);
          return {
            width: clientWidth,
            height: clientHeight
          };
        }
      },
      {
        key: 'getScrollFixPosition',
        value: function getScrollFixPosition(scrollTop, scrollLeft) {
          var windowSize = this.getWindowSize();
          var maxScrollTop = $(document).height() - windowSize.height;
          if (scrollTop > maxScrollTop)
            scrollTop = Math.max(maxScrollTop, 0);
          var maxScrollLeft = $(document).width() - windowSize.width;
          if (scrollLeft > maxScrollLeft)
            scrollLeft = Math.max(maxScrollLeft, 0);
          if (this.isTopScroll && this.isLeftScroll)
            return {
              scrollTop: scrollTop,
              scrollLeft: scrollLeft
            };
          else if (this.isTopScroll)
            return { scrollTop: scrollTop };
          else if (this.isLeftScroll)
            return { scrollLeft: scrollLeft };
        }
      },
      {
        key: 'scrollStart',
        value: function scrollStart(target, complate) {
          var _this = this;
          scrollStop();
          var _getScrollPosition = this.getScrollPosition(target);
          var scrollTop = _getScrollPosition.scrollTop;
          var scrollLeft = _getScrollPosition.scrollLeft;
          var isComplate = false;
          $STAGE.delay(this.delay).animate(this.getScrollFixPosition(scrollTop, scrollLeft), this.speed, this.easing, function () {
            if (isComplate)
              return;
            isComplate = true;
            if (_this.isAddHash && typeof target === 'string') {
              location.hash = target;
            }
            if (complate)
              complate({
                target: target,
                scrollTop: scrollTop,
                scrollLeft: scrollLeft
              });
          });
        }
      }
    ]);
    return Scroll;
  }();
  return exports;
}(smoothPageScroll_Scroll);
jquerysmoothPageScrolljs = function (_Scroll) {
  $.smoothPageScrollByLoaded = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var scrollreset = new _Scroll.Scroll({ speed: 0 });
    scrollreset.scrollStart();
    var scroll = new _Scroll.Scroll(options);
    scroll.scrollStart(location.hash, options.complate);
    var isWebKit = navigator.userAgent.indexOf('WebKit') !== -1;
    if (isWebKit)
      location.hash = '';
  };
  $.smoothPageScrollStart = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var scroll = new _Scroll.Scroll(options);
    scroll.scrollStart(options.target, options.complate);
  };
  $.fn.smoothPageScroll = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var scroll = new _Scroll.Scroll(options);
    $(document).on('click', $(this).selector, function (e) {
      var target = e.currentTarget.hash || options.target;
      scroll.scrollStart(target, options.complate);
      return false;
    });
  };
  global.addEventListener('DOMMouseScroll', _Scroll.scrollStop, false);
  global.onmousewheel = document.onmousewheel = _Scroll.scrollStop;
  $(document).on('click', function () {
    return (0, _Scroll.scrollStop)();
  });
}(smoothPageScroll_Scroll);
}());
}));