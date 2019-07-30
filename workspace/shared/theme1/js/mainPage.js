//SEARCH START
    $(document).ready(function () {
    $('#search').focus();
    $('#back-arrow .btn').on("click",function () {
       //$('.searchWrapper').removeClass('animated pulse');
        $('.scrollHBar, .scrollVBar').fadeOut(100);

        $('#back-arrow').velocity({ translateX: -100, opacity: 0 }, 100);
        $('#hm-search-box').velocity({ translateY: 0 }, 600).find('#search-container').removeClass('l5 m5 s12 ').addClass('l8 m8 centered');  
        $('.scrollHBar.leftSide a').removeClass('animated bounceInRight');
        $('.scrollHBar.rightSide a').removeClass('animated bounceInLeft');
        $('.scrollVBar.topSide a').removeClass('animated bounceInDown');
        $('.scrollVBar.bottomSide a').removeClass('animated bounceInUp');

    
    });
    $('#search').blur(function () {
        $(this).parent().removeClass('focused z-depth-2');
    })
//SEARCH END




//REQUEST BUTTON WITH NAVIGATION
    $('#btnscrollNav').click(function (e) {
        e.stopPropagation();
        $(".hoverRing").toggle();
		$(".indexHeader").slideToggle();
        var checkRequestOpen = $('#search-container').hasClass('l5');
        if (checkRequestOpen == true) {
            $('#back-arrow .btn').trigger('click');
            $('.s-n-b-wrapper').css({ opacity: 1 });
            $('#workQueue_btn').show();
        } else {
            $('#hm-search-box').velocity({ translateY: -155, opacity: 0 }, 300).velocity({translateX: 0, opacity: 1 },300);
            $('.s-n-b-wrapper').css({ opacity: 0 });

            $('#search-container').addClass('l5 m5 s12');
            $('#workQueue_btn').hide();
            $('.scrollHBar, .scrollVBar').fadeToggle(function () { initializeNav(); });
            //$('.scrollHBar.leftSide a').toggleClass('animated bounceInRight');
            //$('.scrollHBar.rightSide a').toggleClass('animated bounceInLeft');
            //$('.scrollVBar.topSide a').toggleClass('animated bounceInUp');
            // $('.scrollVBar.bottomSide a').toggleClass('animated bounceInDown');
		    //$('.scrollHBar.leftSide').toggleClass('animated slideInRight');
           //$('.scrollHBar.rightSide').toggleClass('animated slideInLeft');
            //$('.scrollVBar.topSide').toggleClass('animated bounceInUp');
            //$('.scrollVBar.bottomSide').toggleClass('animated bounceInDown');
        }
    });

    $(function () {
        setTimeout(function () {
// debugger;
        $(".scrollHBar .collection, .scrollVBar .collection").sortable({
            connectWith: ".scrollHBar .collection, .scrollVBar .collection",
            placeholder: 'placeholder',
            appendTo: '.navMenuContainer',
            "cursor": "move",
            helper: "clone",
            revert: true,
            start: function (event, ui) { //show original when hiding clone
           //     ui.item.removeClass('animated');
                $('.floatingDropbox').hide();
            },
            stop: function (event, ui) { //show original when hiding clone
            },
            receive: function (event, ui) {
                // var sourceList = ui.sender;
                // var targetList = $(this);
                if ($(this).parents('.navScrollBar').hasClass('leftSide')) {
                    ui.item.removeClass('bounceInLeft').removeClass('bounceInRight').removeClass('bounceInUp').removeClass('bounceInDown');
                    ui.item.addClass('bounceInRight');
                }
                if ($(this).parents('.navScrollBar').hasClass('rightSide')) {
                    ui.item.removeClass('bounceInLeft').removeClass('bounceInRight').removeClass('bounceInUp').removeClass('bounceInDown');
                    ui.item.addClass('bounceInLeft');
                }
                if ($(this).parents('.navScrollBar').hasClass('topSide')) {
                    ui.item.removeClass('bounceInLeft').removeClass('bounceInRight').removeClass('bounceInUp').removeClass('bounceInDown');
                    ui.item.addClass('bounceInUp');
                }
                if ($(this).parents('.navScrollBar').hasClass('bottomSide')) {
                    ui.item.removeClass('bounceInLeft').removeClass('bounceInRight').removeClass('bounceInUp').removeClass('bounceInDown');
                    ui.item.addClass('bounceInDown');
                }
                ui.item.css({ display: "inline-block" });
                initializeNav();
            }
        }).disableSelection();
        }, 2000);
    });

    $('.reqNavArrow').click(function () {
        var el = $(this);
        var sender = el.siblings('.collection');
        var reciv = "";
        var arrowName = el.data('arrow');
        switch (arrowName) {
            case "top":
                var elToMove = sender.children("a").last();
                elToMove.removeClass('bounceInUp').addClass('bounceInDown');
                reciv = $('.scrollVBar.bottomSide .collection');
                reciv.prepend(elToMove);
                break;
            case "bottom":
                var elToMove = sender.children("a").first();
                elToMove.removeClass('bounceInDown').addClass('bounceInUp');
                reciv = $('.scrollVBar.topSide .collection');
                reciv.append(elToMove);
                break;
            case "left":
                var elToMove = sender.children("a").last();
                elToMove.removeClass('bounceInRight').addClass('bounceInLeft');
                reciv = $('.scrollHBar.rightSide .collection');
                reciv.prepend(elToMove);
                break;
            case "right":
                var elToMove = sender.children("a").first();
                elToMove.removeClass('bounceInLeft').addClass('bounceInRight');
                reciv = $('.scrollHBar.leftSide .collection');
                reciv.append(elToMove);
                break;
        }
        initializeNav();
    });

    ////CODE FOR SUBNAVIGAION
    //$(".collection-item").on("click", function () {
    //    var $this, $thisOffSetLeft, $thisOffSetTop, $thisWidth, $thisHeight, $thisWidthBy2, $thisHeightBy2, $windowHeight, $windowWidth;
    //    $this = $(this);
    //    $('.barContainer .collection-item').removeClass('selected');
    //    $this.addClass('selected');
    //    $thisOffSetLeft = $this.offset().left;
    //    $thisOffSetTop = $this.offset().top;
    //    $thisWidth = $this.outerWidth();
    //    $thisHeight = $this.outerHeight();
    //    $thisWidthBy2 = $thisWidth / 2;
    //    $thisHeightBy2 = $thisHeight / 2;
    //    $windowHeight = $(window).outerHeight();
    //    $windowWidth = $(window).outerWidth();
    //    var ajustmentVal = 40;
    //    var ajustmentValV = 10;
    //    var $container, containerTop, containerLeft, adjTop, $arrow;
    //    $container = $(".floatingDropbox");
    //    $arrow = $container.find('.arrowTrangle');
    //    $parent = $this.parents('.navScrollBar');
    //    $containerHeight = $container.outerHeight();
    //    $containerWidth = $container.outerWidth();
    //    $horizontalTop = $('#divScrollHLeft').offset().top;
    //    $verticalLeft = $('#divScrollVBottom').offset().left;
    //    $arrow.css({ 'top': '', 'left': '', 'right': '' });
    //    $container.find('li').css({ float: '' });
    //    $container.find('.textCircle').css({ float: '' });
    //    if ($parent.hasClass('scrollHBar')) {
    //        $arrow.addClass('triangle-down').removeClass('triangle-left');
    //        containerTop = $thisOffSetTop + $thisHeight;
    //        containerLeft = $thisOffSetLeft + $thisWidthBy2 - ajustmentVal;
    //        if ((containerLeft + $containerWidth) > $verticalLeft && $parent.hasClass('leftSide')) {
    //            $container.find('li').css({ float: 'right' });
    //            $container.find('.textCircle').css({ float: 'left' });
    //            containerLeft = containerLeft - ($thisWidth + 55);
    //            $arrow.css({ 'left': 'auto', 'right': '30px' });
    //        } else {
    //            if ((containerLeft + $containerWidth) > $windowWidth && $parent.hasClass('rightSide')) {
    //                $container.find('li').css({ float: 'right' });
    //                $container.find('.textCircle').css({ float: 'left' });
    //                containerLeft = containerLeft - ($thisWidth + 55);
    //                $arrow.css({ 'left': 'auto', 'right': '30px' });
    //            }
    //        }
    //    } else {
    //        $arrow.removeClass('triangle-down').addClass('triangle-left');
    //        containerLeft = $thisOffSetLeft + $thisWidth;
    //        containerTop = $thisOffSetTop - ajustmentValV;
    //        if ((containerTop + $containerHeight) > $horizontalTop && $parent.hasClass('topSide')) {
    //            adjTop = (containerTop + $containerHeight) - $horizontalTop;
    //            containerTop = containerTop - adjTop;
    //            //var $arrowTT = parseInt($arrow.css('top'));
    //            var $arrowTT = 50;
    //            if (parseInt($arrow.css('top')) >= 50) {
    //                $arrow.css({ 'top': ($arrowTT + adjTop) });
    //            }
    //        } else {
    //            if ((containerTop + $containerHeight) > $windowHeight && $parent.hasClass('bottomSide')) {
    //                adjTop = (containerTop + $containerHeight) - $windowHeight;
    //                containerTop = containerTop - adjTop;
    //                var $arrowTT = 50;
    //                if (parseInt($arrow.css('top')) >= 50) {
    //                    $arrow.css({ 'top': ($arrowTT + adjTop) });
    //                }
    //            }
    //        }
    //    }

    //    $container.css({
    //        position: "fixed",
    //        top: (containerTop) + "px",
    //        left: (containerLeft) + "px",
    //        opacity: 0.9
    //    });
    //});


//HIDE AFTER CLICKED OUT SIDE
    $(document).on('click', function (e) {
        var box = $(e.target).closest('.floatingDropbox'),
            elem = $(e.target).closest('.navMenuContainer');
        if (elem.length) {
            $('.floatingDropbox').show();
        } else if (!box.length) {
            $('.floatingDropbox').hide();
            $('.barContainer .collection-item').removeClass('selected');
        }
    });

    initializeNav();


});

    //INIT THE NAVIGATION 
    function initializeNav() {
        $('body').css({ 'overflow': 'hidden' });
        var offSL = $('.navMenuContainer').offset().left;
        var offST = $('.navMenuContainer').offset().top;
        var windowWidth = $(window).width(); //retrieve current window width
        var windowHeight = $(window).height(); //retrieve current window height
        var rightSi = (windowWidth - offSL) - $('.navMenuContainer').width();
        var bottomSi = (windowHeight - offST) - $('.navMenuContainer').height();
        $('.scrollHBar.leftSide').width(offSL -3);
        $('.scrollHBar.rightSide').width(rightSi - 3);
        $('.scrollVBar.topSide').height(offST - 96);
        $('.scrollVBar.bottomSide').height(bottomSi + 17);

        var totalWidth = 0;
        $('.scrollHBar.leftSide .collection a').each(function () {
            totalWidth = totalWidth + $(this).outerWidth() + 5;
        });
        if ((offSL - 100) < totalWidth) {
            $('.scrollHBar.leftSide .collection').width(totalWidth);
            var lMarg = '-' + (totalWidth - (offSL - 100));
            $('.scrollHBar.leftSide .collection').css({ "margin-left": parseInt(lMarg) });
            $('.scrollHBar.leftSide .reqNavArrow').show();
        } else {
            $('.scrollHBar.leftSide .collection').width("100%");
            $('.scrollHBar.leftSide .collection').css({ "margin-left": "" });
            $('.scrollHBar.leftSide .reqNavArrow').hide();
        }

        totalWidth = 0;
        $('.scrollHBar.rightSide .collection a').each(function () {
            totalWidth = totalWidth + $(this).outerWidth() + 5;
        });
        if ((rightSi - 100) < totalWidth) {
            $('.scrollHBar.rightSide .collection').width(totalWidth);
            $('.scrollHBar.rightSide .reqNavArrow').show();
        } else {
            $('.scrollHBar.rightSide .collection').width("100%");
            $('.scrollHBar.rightSide .reqNavArrow').hide();
        }

        var totalheight = $('.scrollVBar.topSide .collection').height();

        if ((offST - 140) < totalheight) {
            console.log("inside if");
            var tMag = '-' + ((totalheight + 210) - offST);
            $('.scrollVBar.topSide .collection').css({ "margin-top": parseInt(tMag) });
            $('.scrollVBar.topSide .reqNavArrow').show();
        } else {
            var tMag = (offST -(totalheight + 200));
            $('.scrollVBar.topSide .collection').css({ "margin-top": parseInt(tMag) });
            $('.scrollVBar.topSide .reqNavArrow').hide();
        }

        totalheight = 0;
        $('.scrollVBar.bottomSide .collection a').each(function () {
            totalheight = totalheight + $(this).outerHeight();
        });

        if ((bottomSi - 70) < totalheight) {
            $('.scrollVBar.bottomSide .reqNavArrow').show();
        } else {
            $('.scrollVBar.bottomSide .reqNavArrow').hide();
        }
    }

	
$(window).resize(function () {
    initializeNav();
});

//SEARCH REDIRECT TO PAGE.
$('#search').keyup(function(e){
	if(e.keyCode == 13){
		if($(this).val() != "")
		{
			document.location.href='searchResult.html';
		}
	}
});

