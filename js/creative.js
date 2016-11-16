(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);



    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                debugger;
                var data = $(item).data();

                return '<p>'+data.description+'</p>' ;
            }
        }
    });


    //send email

    $('.button').click(function (event) {
        // Don't go the the link that was clicked, just 
        // cancel the rest of the click event
        event.preventDefault();

        // If there were any errors displaying hide them 
        // until we get a new one or a success message
        $(".error-message").hide("fast").text("");

        // Show that we're trying to send the message
        $(".sending-message").show("fast");

        // Post the form to the Umbraco Web API controller
        // To be found in App_Code/UmbContactController.cs
        $.ajax({
            url: "/umbraco/api/umbcontact/post/",
            data: {
                email: $("form input[name='email']").val(),
                name: $("form input[name='name']").val(),
                message: $("form textarea[name='message']").val(),
                settingsNodeId: $("form input[name='settingsNodeId']").val()
            },
            type: "POST",
            success: function () {
                // Clear the form fields after successful submit
                $("form input[name='email']").val("");
                $("form input[name='name']").val("");
                $("form textarea[name='message']").val("");

                // Then hide the form/sending message and show the success message
                $(".sending-message").hide("fast");
                $("form").hide("fast");
                $(".success-message").show("fast");
            },
            error: function (xhr) {
                $(".sending-message").hide("fast");
                $(".error-message").text(xhr.responseJSON.Message).show("fast");
            }
        });
    });

})(jQuery); // End of use strict


