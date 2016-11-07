(function($) {

  // Making elements equal height
    var equalheight = function(container){

      var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;

      $(container).find('.equal').each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
          for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
              rowDivs[currentDiv].height(currentTallest);
        }
          rowDivs.length = 0; // empty the array
          currentRowStart = topPostion;
          currentTallest = $el.height();
          rowDivs.push($el);
        } else {
          rowDivs.push($el);
          currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
      });
    };

  // Check for window width before resizing
  function equalHeightChecker () {
    if ( window.innerWidth > 767 && !heightIsSet ) {
      $('.equalizer')
        .each(function(){
          equalheight(this);
          heightIsSet = true;
        });
    }
    else if (window.innerWidth<768 && heightIsSet) {
      $('.equalizer')
        .each(function(){
          $(this).find('.equal').each(function () {
            this.style.height = 'auto';
          });
          heightIsSet = false;
        });
    }
  }

  // Initialize equal height script
  var heightIsSet;

  // On load
  $(window).load(function() {
   equalHeightChecker();
  });

  // and on resize
  $(window).resize(function(){
    equalHeightChecker();
  });

  // Navigation
  $('#toggle').click(function(){
    $('.has-child').removeClass('selected');
    $('nav').toggleClass('open');
    $('.cross').toggleClass('open');
  });

  $('.has-child').click(function(){
    if ( window.innerWidth < 768 ) {
      if ( $( this ).hasClass('selected')){
        $('.has-child').removeClass('selected');    
      } else {
        $('.has-child').removeClass('selected'); 
        $(this).toggleClass('selected');
      }
    }
  });

})(jQuery);


    $(document).ready(function () {

        var time = 7; // time in seconds

        var $progressBar,
            $bar,
            $elem,
            isPause,
            tick,
            percentTime;

        //Init the carousel
        $("#owl-demo").owlCarousel({
            slideSpeed: 500,
            paginationSpeed: 500,
            singleItem: true,
            afterInit: progressBar,
            afterMove: moved,
            startDragging: pauseOnDragging
        });

        //Init progressBar where elem is $("#owl-demo")
        function progressBar(elem) {
            $elem = elem;
            //build progress bar elements
            buildProgressBar();
            //start counting
            start();
        }

        //create div#progressBar and div#bar then prepend to $("#owl-demo")
        function buildProgressBar() {
            $progressBar = $("<div>", {
                id: "progressBar"
            });
            $bar = $("<div>", {
                id: "bar"
            });
            $progressBar.append($bar).prependTo($elem);
        }

        function start() {
            //reset timer
            percentTime = 0;
            isPause = false;
            //run interval every 0.01 second
            tick = setInterval(interval, 10);
        };

        function interval() {
            if (isPause === false) {
                percentTime += 1 / time;
                $bar.css({
                    width: percentTime + "%"
                });
                //if percentTime is equal or greater than 100
                if (percentTime >= 100) {
                    //slide to next item 
                    $elem.trigger('owl.next')
                }
            }
        }

        //pause while dragging 
        function pauseOnDragging() {
            isPause = true;
        }

        //moved callback
        function moved() {
            //clear interval
            clearTimeout(tick);
            //start again
            start();
        }

        //uncomment this to make pause on mouseover 
        // $elem.on('mouseover',function(){
        //   isPause = true;
        // })
        // $elem.on('mouseout',function(){
        //   isPause = false;
        // })

    });
