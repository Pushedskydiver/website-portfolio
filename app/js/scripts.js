(function($) {

    'use strict';

    var AC = function() {
        this.VERSION = "1.1.0";
        this.AUTHOR = "Alex Clapperton";
        this.SUPPORT = "alexclapperton@nuttersons.co.uk";

        this.pageScrollElement = 'html, body';
        this.$body = $('body');

        this.setUserOS();
        this.setUserAgent();
    }

    // Set environment vars
    AC.prototype.setUserOS = function() {
        var OSName = "";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
        if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
        if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";

        this.$body.addClass(OSName);
    }

    AC.prototype.setUserAgent = function() {
        if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
            this.$body.addClass('mobile');
        } else {
            this.$body.addClass('desktop');
            if (navigator.userAgent.match(/MSIE 9.0/)) {
                this.$body.addClass('ie9');
            }
        }
    }

    // AC util functions
    AC.prototype.getUserAgent = function() {
        return $('body').hasClass('mobile') ? "mobile" : "desktop";
    }

    $.AC = new AC();
    $.AC.Constructor = AC;

})(window.jQuery);


(function($) {

    'use strict';

    // ======================================
    //    Dummy link
    // ======================================
    function init_dummy_link() {
      // Disable default link behavior for dummy links that have href='#'
      var $emptyLink = $('a[href=#]');
      $emptyLink.on('click', function(e){
        e.preventDefault();
      });
    }


    // ======================================
    //    Smooth Scroll to element
    // ======================================
  	function init_scroll_to() {
      var $scrollTo = $('.scroll-to');
    	$scrollTo.on('click', function(event){
    		var $elemOffsetTop = $(this).data('offset-top');
    		$('html').velocity("scroll", { offset:$(this.hash).offset().top-$elemOffsetTop, duration: 1500, easing:'easeInOutCubic', mobileHA: false});
    		event.preventDefault();
    	});
  	}


    // ======================================
    //    Smooth scroll to top button
    // ======================================
    function init_smooth_scroll_top() {
      // Animated Scroll to Top Button
      var $scrollTop = $('.scroll-to-top-btn');
      if ($scrollTop.length > 0) {
        $(window).on('scroll', function(){
          if ($(window).scrollTop() > 600) {
            $scrollTop.addClass('visible');
          } else {
            $scrollTop.removeClass('visible');
          }
        });
        $scrollTop.on('click', function(e){
          e.preventDefault();
          $('html').velocity("scroll", { offset: 0, duration: 1500, easing:'easeInOutCubic', mobileHA: false });
        });
      };
    }


    // ======================================
    //    Mobile navigation
    // ======================================
    function init_mobile_nav() {
      $(window).resize(function(){

        if ($(window).width() >= 992) {
          $('.trigger-nav').css('display', 'none');
          $('.site-nav').css('display', 'block');

          if ($('.trigger-nav').hasClass('open-nav')) {
            $('.trigger-nav').removeClass('open-nav');
          }
        } else if ($(window).width() < 992) {
          $('.trigger-nav').css('display', 'block');
          $('.site-nav').css('display', 'none');
        }

      });

      $('.trigger-nav').on('click', function() {

      	if (!$(this).hasClass('open-nav')) {
      		$(this).addClass('open-nav');
      		toggleNav(true);
      	} else {
      		$(this).removeClass('open-nav');
      		toggleNav(false);
      	}

      });

			$(window).bind('scroll', function() {
				if ($('.trigger-nav').hasClass('open-nav')) {
					$('.site-nav').css('display', 'block');
				}
			});

      function toggleNav(bool) {
      	if (bool === true) $('.site-nav').slideDown();
      	else $('.site-nav').slideUp();
      }
    }


    // ==============================================
    //    Contact form | Contact page
    // ==============================================
    function init_contact() {
      $(function () {
        // Get the form.
        var form = $('#ajax-contact'),
            // Get the messages div.
            formMessages = $('#form-messages');

        // Set up an event listener for the contact form.
        $(form).submit(function (e) {
          // Stop the browser from submitting the form.
          e.preventDefault();

          // Serialize the form data.
          var formData = $(form).serialize();

          // Submit the form using AJAX.
          $.ajax({
                  type: 'POST',
                  url: $(form).attr('action'),
                  data: formData
          })
          .done(function (response) {
              // Make sure that the formMessages div has the 'success' class.
              $(formMessages).removeClass('error').addClass('success').fadeIn().delay(5000).fadeOut();
              // Set the message text.
              $(formMessages).text(response);

              // Clear the form.
              $(form).trigger("reset");
          })
          .fail(function (data) {
              // Make sure that the formMessages div has the 'error' class.
              $(formMessages).removeClass('success').addClass('error').fadeIn().delay(5000).fadeOut();
              // Set the message text.
              if (data.responseText !== '') {
                  $(formMessages).text(data.responseText);
              } else {
                  $(formMessages).text('Oops! An error occured and your message could not be sent.');
              }
          });
        });
      });
    }


    // ==============================================
    //    WOW | Animation on scroll
    // ==============================================
    function init_wow() {
      var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: false, // trigger animations on mobile devices (default is true)
        live: true // act on asynchronously loaded content (default is true)
      })
    }


    // ==============================================
    //    Initialise plugins
    // ==============================================
    init_dummy_link();
    init_scroll_to();
    init_smooth_scroll_top();
    init_contact();

    if (!$('init_mobile_nav').hasClass('desktop')) {
      init_mobile_nav();
    }
    if (!$('body').hasClass('mobile')) {
      init_wow();
    }

})(window.jQuery);
