(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	var carousel = function() {
		$('.featured-carousel').owlCarousel({
	    loop: false,
	    autoplay: false,
	    margin: 25,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav: false,
	    dots: false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      500:{
	        items:2
	      },
	      1000:{
	        items:3
	      },
	      1500:{
	        items:4
	      }
	    }
		});

	};
	carousel();

})(jQuery);
