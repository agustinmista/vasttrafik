(function($) {
    "use strict";

    var fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function() { $('.js-fullheight').css('height', $(window).height()); });
    };
    fullHeight();

    var carousel = function() {
        $('.featured-carousel').owlCarousel({
            items: 1,
            margin: 25,
            loop: false,
            autoplay: false,
            nav: false,
            dots: false,
            autoplayHoverPause: false,
            animateOut: "fadeOut",
            animateIn: "fadeIn",
            navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
            responsive:{
                0:   { items:1 },
                500: { items:2 },
                1000:{ items:3 },
                1500:{ items:4 }
            }
        });
    };
    carousel();

})(jQuery);
