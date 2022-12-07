function main() {
  (function () {
    'use strict';

    /* Handles navbar */

    // Hide navbar after clicking a list item in navbar
    $('.page-scroll').on('click', function() {
      var selector = '.navbar-collapse.navbar-right.navbar-main-collapse.collapse.in';
      $(selector).removeClass('in');
    });

    $('a.page-scroll').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 900);

            return false;
          }
      }
    });

    // Hide Header on scroll down on wide displays
    var didScrollNav;
    var lastScrollTop = 0;
    var delta = 5;

    $(window).scroll(function(event) {
      didScrollNav = true;
    });

    setInterval(function() {
      if (didScrollNav) {
        hasScrolledNav(this);
        didScrollNav = false;
      }
    }, 250); 

    function hasScrolledNav(myWindow) {
      var st = $(myWindow).scrollTop();
      var navbarHeight = $("#nav").outerHeight();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
        return;
        
      // If scrolled down and currently past the navbar, add class .nav-up.
      // This is necessary so what is "behind" the navbar is never seen.
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $("#nav").removeClass('nav-down').addClass('nav-up');
        $(".nav-up").css({"top": -navbarHeight});
      } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
          $('#nav').removeClass('nav-up').addClass('nav-down');
          $(".nav-down").css({"top": 0});
        }
      }
      lastScrollTop = st;
    }

    /* Handles image and icon credits toggling */
    
    var areCreditsDisplayed = false;
    function toggleCredits(areCreditsDisplayed) {
      $('.credits-list').css({"display": areCreditsDisplayed ? 'block' : 'none'});
      $('#credits-down').css({"display": areCreditsDisplayed ? 'none' : 'inline-block'});
      $('#credits-up').css({"display": areCreditsDisplayed ? 'inline-block' : 'none'});
    }

    function scrollCredits() {
      var target = $('.credits-list');
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 100);
    }

    $('#credits-btn').on('click', function() {
      areCreditsDisplayed = !areCreditsDisplayed;
      toggleCredits(areCreditsDisplayed);
      scrollCredits();
    });

    $('#credits-down').on('click', function() {
      areCreditsDisplayed = true;
      toggleCredits(areCreditsDisplayed);
      scrollCredits();
    });

    $('#credits-up').on('click', function() {
      areCreditsDisplayed = false;
      toggleCredits(areCreditsDisplayed);
    });
  }());
}

main();