/**
 * Bootstrap Grayscale (Modified)
 *
 * Source: https://github.com/BlackrockDigital/startbootstrap-grayscale
 * License: MIT
 */

(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 69)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 100
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

/**
 * Make sure the homepage videos are auto-playing
 */
(function ($) {
    "use strict";

    document.getElementById('video-1').play();
    document.getElementById('video-2').play();

    var windowWidth = $(window).width();
    var isMobile = $(window).width() <= 992;

    $(window).on('resize', function(event) {
        if (windowWidth == $(window).width()) {
            return;
        }
        windowWidth = $(window).width();
        var isMobileAfterResize = $(window).width() <= 992;
        if ((isMobileAfterResize && !isMobile) || (!isMobileAfterResize && isMobile)) {
            isMobileAfterResize ? updateCarouselRatio(true) : updateCarouselRatio(false);
        }
        isMobile = isMobileAfterResize;
    });

    var updateCarouselRatio = function (mobileView) {
        //console.log('Set video to ' + (mobileView ? 'mobile' : 'pc') + ' view!');
        $(mobileView ? '.embed-responsive-16by9' : '.embed-responsive-1by1')
            .removeClass(mobileView ? 'embed-responsive-16by9' : 'embed-responsive-1by1')
            .addClass(mobileView ? 'embed-responsive-1by1' : 'embed-responsive-16by9');
    }
    updateCarouselRatio(isMobile);

})(jQuery);