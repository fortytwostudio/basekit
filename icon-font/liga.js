/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
	'use strict';
	function supportsProperty(p) {
		var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
			i,
			div = document.createElement('div'),
			ret = p in div.style;
		if (!ret) {
			p = p.charAt(0).toUpperCase() + p.substr(1);
			for (i = 0; i < prefixes.length; i += 1) {
				ret = prefixes[i] + p in div.style;
				if (ret) {
					break;
				}
			}
		}
		return ret;
	}
	var icons;
	if (!supportsProperty('fontFeatureSettings')) {
		icons = {
			'LinkedIn': '&#xf0e1;',
			'Email': '&#xf0e0;',
			'Search': '&#xf002;',
			'email': '&#xf003;',
			'Home': '&#xf015;',
			'Close': '&#xd7;',
			'Zoom': '&#xf00e;',
			'View': '&#xf00e;',
			'Pin': '&#xf041;',
			'Map': '&#xf041;',
			'twitter': '&#xf081;',
			'facebook': '&#xf082;',
			'GitHub': '&#xf092;',
			'linkedin': '&#xf08c;',
			'RSS': '&#xf09e;',
			'Facebook': '&#xf09a;',
			'Twitter': '&#xf099;',
			'Call': '&#xf095;',
			'Navigation': '&#xf0c9;',
			'Menu': '&#xf0c9;',
			'Quote': '&#x201c;',
			'Feed': '&#xf143;',
			'Tumblr': '&#xf174;',
			'Flickr': '&#xf16e;',
			'Instagram': '&#xf16d;',
			'Youtube': '&#xf16a;',
			'Skype': '&#xf17e;',
			'Vimeo': '&#xf194;',
			'Love': '&#xf004;',
			'Fave': '&#xf004;',
			'Star': '&#xf005;',
			'Grid': '&#xf00a;',
			'Gallery': '&#xf00a;',
			'List': '&#xf00b;',
			'OK': '&#x2713;',
			'Settings': '&#xf013;',
			'Start': '&#xf011;',
			'Login': '&#xf011;',
			'Tag': '&#xf02b;',
			'Tagged': '&#xf02b;',
			'Flag': '&#xf02e;',
			'Mark': '&#xf02e;',
			'Marked': '&#xf02e;',
			'Fax': '&#xf02f;',
			'Print': '&#xf02f;',
			'Query': '&#x3f;',
			'Information': '&#xf05a;',
			'Notice': '&#xf05a;',
			'Info': '&#xf05a;',
			'Important': '&#x21;',
			'Alert': '&#x21;',
			'Date': '&#xf073;',
			'Calendar': '&#xf073;',
			'Event': '&#xf073;',
			'Events': '&#xf073;',
			'Trolley': '&#xf07a;',
			'Cart': '&#xf07a;',
			'Basket': '&#xf07a;',
			'Global': '&#xf0ac;',
			'Location': '&#xf0ac;',
			'Locations': '&#xf0ac;',
			'GooglePlus': '&#xf0d4;',
			'Pinterest': '&#xf0d3;',
			'Return': '&#xf112;',
			'Open': '&#xf14d;',
			'Visit': '&#xf14d;',
			'Video': '&#xf03d;',
			'Movie': '&#xf03d;',
			'Photo': '&#xf03e;',
			'Picture': '&#xf03e;',
			'Image': '&#xf03e;',
			'Continue': '&#xf045;',
			'Time': '&#xf017;',
			'Person': '&#xf007;',
			'Profile': '&#xf007;',
			'Like': '&#xf087;',
			'People': '&#xf0c0;',
			'Group': '&#xf0c0;',
			'Staff': '&#xf0c0;',
			'Load': '&#xf021;',
			'Reload': '&#xf021;',
			'Code': '&#xf121;',
			'Source': '&#xf121;',
			'Phone': '&#xf10b;',
			'Download': '&#xf019;',
			'Required': '&#x2a;',
			'Contact': '&#xf086;',
			'Chat': '&#xf086;',
			'Talk': '&#xf086;',
			'Document': '&#xf0f6;',
			'Documents': '&#xf0f6;',
			'Secure': '&#xf023;',
			'Upload': '&#xf093;',
			'0': 0
		};
		delete icons['0'];
		window.icomoonLiga = function (els) {
			var classes,
				el,
				i,
				innerHTML,
				key;
			els = els || document.getElementsByTagName('*');
			if (!els.length) {
				els = [els];
			}
			for (i = 0; ; i += 1) {
				el = els[i];
				if (!el) {
					break;
				}
				classes = el.className;
				if (/icon-/.test(classes)) {
					innerHTML = el.innerHTML;
					if (innerHTML && innerHTML.length > 1) {
						for (key in icons) {
							if (icons.hasOwnProperty(key)) {
								innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
							}
						}
						el.innerHTML = innerHTML;
					}
				}
			}
		};
		window.icomoonLiga();
	}
}());