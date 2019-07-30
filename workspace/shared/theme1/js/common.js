$(function () {
    $('.modal-trigger').leanModal();
    $('select').material_select({ constrain_width: false});
    /*navigation js*/
    $('.right-side-nav').sideNav({
        menuWidth: 320,
        edge: 'right',
        closeOnClick: false
    });

    $('.nav-right-buttons li').not(':first-child').find('a').on("click",
            function () {
                var $this = $(this).parent();
                var $thisId = $(this).attr('id');
                if ($('#overlay1').css('display') == 'block') {
                    setTimeout(function () {
                        $('.overlayOkayButton').trigger('click');
                    },200);
                }
                if ($this.hasClass('currentActive') ) {
                    if ($this.is(':last-child')) {
                        $this.parent().removeClass('nav-slide-active');
                    }
                    $this.removeClass('currentActive');
                    return false;
                } else {
                    $('.currentActive > a').trigger('click');// this clicked on a tag and close opened side nav
                    if ($this.is(':last-child')) {
                        $this.parent().addClass('nav-slide-active');
                    }
                    $this.addClass('currentActive');
                    return false;
                }
            });

    $("body").delegate("#sidenav-overlay, .drag-target", "click", function () {
        $('.nav-right-buttons').removeClass('nav-slide-active')
            .find('li').removeClass('currentActive');

    });

    $("#searchBox").on({
        "focus": function () {
            var thisVale = $(this).val();
            if (thisVale == "SEARCH") {
                $(this).val('');
                $(this).addClass('searchActive');
            }
        }, "focusout": function () {
            var thisVale = $(this).val();
            if (thisVale == '') {
                $(this).val('SEARCH');
                $(this).removeClass('searchActive');
            }
        }
    });
    $("#searchBox").on("keydown", function () {
        $("#close-search-box").show();
    });
    $("#close-search-box").on("click", function () {
        $('#searchBox').val('SEARCH').removeClass('searchActive');
        $(this).hide();
    });
    /*navigation js end*/
    /*responsive Scrollbar */
    $('.scrollbar-outer').scrollbar({ autoScrollSize: true, disableBodyScroll: true, duration: 200 });
    /*responsive Scrollbar end*/

    //Keyboard Enabale
    $(window).keyup(function (evt) {
    
        var keyCode = evt.keyCode;
        var altKey = evt.altKey;
        var overLayExist = $('#sidenav-overlay').val();
        if (overLayExist === '') {
            overLayExist = true;
        }
        switch (keyCode)
        {
            case 78: if (altKey) {
                $('#rightNavId').trigger('click');
                $('#searchBox').focus();
                break;
            }
            case 82: if (altKey && !overLayExist) {
                $('#btnscrollNav').trigger('click').focus();
                break;
            }
            case 87: if (altKey && !overLayExist) {
                $('#workQueue_btn')[0].click();
                break;
            }
            case 83: if (altKey && !overLayExist) {
                $('#search').trigger('click').focus();
                $('#back-arrow').children('a').trigger('click');
                break;
            }
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 2) {
            $("body").addClass("navFixedUp");
        }
        else {
            $("body").removeClass("navFixedUp");
        }
    });
	
	


    // $("#subNavSearchTrigger").on("click", function () {
    //        
    //		var checkSearchIcon = $("#iconSearch").css('display');
    //        if (checkSearchIcon == "block") {
    //            $("#left-content").velocity({ opacity: 0, translateX: -1200 });
    //            $("#header_search_box").css('left','0').velocity({ opacity: 1, translateX: 0 }).find('input').focus();
    //            $(this).find('i').hide();
    //            $('#header_search_box #iconClose').show();
    //
    //        } else {
    //            $("#left-content").velocity({ opacity: 1, translateX: 0 })
    //            $("#header_search_box").css('left','-100%').velocity({ opacity:0, translateX: -1200 });
    //            $(this).find('i').hide();
    //            $('#header_search_box #iconSearch').show();
    //        }
    //     });
	 
   
	
	
	
	if($('.search-header').parent().hasClass('search-reverse')){
	    $("#iconSearch").parent().parent('li').css({ visibility: 'hidden' });
	
	$("#left-content").css('left','-100%').velocity({ opacity: 0, translateX: -1200 }); 
	$("#iconClose").click(function(){
        $("#left-content").css('left','0%').velocity({ opacity: 1, translateX: 0 });
        $("#header_search_box").velocity({ opacity:0, translateX: -1200 });
        $("#iconSearch").parent().parent('li').css({ visibility: 'visible' }).end().end().fadeIn();
        $('#iconClose').fadeOut();
			 
    });
	
	
    $("#iconSearch").click(function(){
        $("#left-content").css('left','-100%').velocity({ opacity: 0, translateX: -1200 });
        $("#header_search_box").velocity({ opacity: 1, translateX: 0 }).find('input').focus();
        $("#iconSearch").parent().parent('li').css({ visibility: 'hidden' });
        $('#iconClose').fadeIn();
		 
    });
		 
   
		}
	
	else{
	
    $("#header_search_box").css('left','-100%').velocity({ opacity: 0, translateX: -1200 }); 
    $("#iconSearch").click(function(){
        $("#left-content").velocity({ opacity: 0, translateX: -1200 });
        $("#header_search_box").css('left','0').velocity({ opacity: 1, translateX: 0 }).find('input').focus();
        $("#iconSearch").fadeOut();
        $('#iconClose').fadeIn();
		 
    });
		 
    $("#iconClose").click(function(){
        $("#left-content").velocity({ opacity: 1, translateX: 0 })
        $("#header_search_box").velocity({ opacity:0, translateX: -1200 });
        $("#iconSearch").fadeIn();
        $('#iconClose').fadeOut();
			 
    });
	 
		}
	
	 
	 

	
    var checkheaderContent = $(".extra-nav-wrap").css("display");
    //    if (checkheaderContent == "block") {
        
    //     $(window).scroll(function () {
    //     
    //            if ($(window).scrollTop() >= 65) {
    //                $("#header-nav").removeClass("navbar-fixed");
    //                $(".extra-nav-wrap").css({ "position": "fixed", "z-index": "2"})
    //				 
    //            } else {
    //             
    //                $(".extra-nav-wrap").css({ "position": "", "z-index": ""})
    //                $("#header-nav").addClass("navbar-fixed");
    //            }
    //        });
    //    } else {
    //        $("#header-nav").addClass("navbar-fixed");
    //    }

    $('.searchWrapper').velocity({ opacity: 1}, 1000);

    $('.home-page-bubble-button').each(function (i) {
        setTimeout(function () {
            $('.home-page-bubble-button').eq(i).addClass("animated bounceIn");
        }, 500 * i);
    }).promise().done(function () {
        $(".small-notification-bubble").velocity({ opacity: 1, translateY: 0 }, 500);
    });

    //$('._icon_Cart').each(function (i) {
    //    setTimeout(function () {
    //        $('._icon_Cart').eq(i).addClass("animated bounceIn");
    //    }, 500 * i);
    //}).promise().done(function () {
    //    $("._icon_Cart").velocity({ opacity: 1, translateY: 0 }, 500);
    //});
	
    $('.track-status-modal').leanModal({
        ready: function () {
            $('.track-section-container').velocity({ opacity: 1, translateY: 0 }).promise().done(function () {
                $('.t-s-c-wrap:nth-child(odd) .t-s-content').velocity({ opacity: 1, translateX: 75 }, 500);
                $('.t-s-c-wrap:nth-child(even) .t-s-content').velocity({ opacity: 1, translateX: -318 }, 500);
            });
        }
    });

    $('#cycleSelect').on("change", function () {
        var thisValue = $(this).val();
        $('.track-section-container').hide(function () {
            $('#' + thisValue).show();
        });
    });

    $('.dropdown-filter').dropdown({
        constrain_width: false,
        alignment: 'right'
    });
    $('.dd-close-off').click(function (e) {
        e.stopPropagation();
    });

    /*popup call from popup*/
    $('._callUserEmailPopup').leanModal({
        ready: function () { $('#track_status').closeModal(); $('body').css('overflow', 'hidden'); }, // Callback for Modal open
        complete: function () { $('#track_status').openModal(); } // Callback for Modal close
    });

    

    /*popup approver*/

    $("#see-more-trigger").on("click", function () {
        var selTotal = $('.s-selected').find('li').length
        if ($(this).hasClass('seeMore')) {

            $('.s-selected')
             .addClass('scrollbar-outer selected-active').delay(500).promise().done(
             function () {               
                 $(this).scrollbar({
                     "onDestroy": function () {
                         $('.s-selected').removeClass('scrollbar-outer selected-active');
                     }
                 });

             });
            $(this).removeClass('seeMore').find('span').text('See Less').prev('i').toggleClass('drop-arrow up-arrow');
        } else {
            $('.s-selected').animate({ 'scrollTop': '0' }, 100).scrollbar("destroy")
            $(this).addClass('seeMore').find('span').text(selTotal + ' More').prev('i').toggleClass('drop-arrow up-arrow');
        }
        
    });

    //Form Validation
    $('.saveFormButton').addClass('disabled');
    $('input').keyup(function () {
        var flaf = true;
        $(this).parents('form').find('input').each(function () {
            var typeee = $(this).attr('type');
            if ($(this).val() == "" && (typeee == 'text' || typeee == 'email')) {
                flaf = false;
            }
        });
        if (flaf) {
            $('.saveFormButton').removeClass('disabled');
        } else {
            $('.saveFormButton').addClass('disabled');
        }
    });


    $('.saveFormButton').click(function (e) {
        e.preventDefault();
        $('._commonForm').submit();
    });

    $('._saveAsDraftBtn').click(function (e) {
        e.preventDefault();
        $('._formLoaderContainer').show();
        setTimeout(function () {
            $('._formLoaderContainer').hide();
            $('#save-as-draft').openModal();
        }, 1000);
    });

//    $('._cancelBtn').click(function (e) {
//        e.preventDefault();
//        $('#cancellationWarning').openModal();
//    });

    $('._commonForm').on('submit', function (e) {
        e.preventDefault();
        var flg = false;
        $(this).find('input').each(function (i) {
            var typee = $(this).attr('type');
            if(typee == "text" || typee == "email"){
                if ($(this).val() == "") {
                    $(this).addClass('invalid');
                    $(this).next().addClass('active');
                    flg = true;
                }
            }
        });
        if (flg) {
            return false;
        } else {
            $('._formLoaderContainer').show();
            setTimeout(function () {
                $('._formLoaderContainer').hide();
                $('#form-save-success').openModal();
            }, 1000);
        }
    });
    //Form Validation end

    //Auto suggetion code
    $('.autoSuggestionBind').keyup(function (e) {
        var el = $(this), elVal, charLength, offset, append;
        elVal = el.val();
        charLength = elVal.length;
        offset = el.offset();
        elWidth = el.outerWidth();
        elHeight = el.height();

        var target1 = el.data('target1');
        if (typeof target1 === 'undefined') {
            target1 = "#";
        }
        var target2 = el.data('target2');
        if (typeof target2 === 'undefined') {
            target2 = "#";
        }
        var target3 = el.data('target3');
        if (typeof target3 === "undefined") {
            target3 = "#";
        }
        var target4 = el.data('target4');
        if (typeof target4 === "undefined") {
            target4 = "#";
        }
        var target5 = el.data('target5');
        if (typeof target5 === "undefined") {
            target5 = "#";
        }

        if (e.keyCode == 13 && elVal != "") {
            window.location.href = target1;
            return;
        }
        append = $('<ul class="collection autosugestedList">' +
            '<li class="collection-item"><a class="black-text" href="' + target1 + '">' + elVal + ' in computers</a><li>' +
            '<li class="collection-item"><a class="black-text" href="' + target2 + '">' + elVal + ' in Accessories</a><li>' +
            '<li class="collection-item"><a class="black-text" href="' + target3 + '">' + elVal + ' networking</a><li>' +
            '<li class="collection-item"><a class="black-text" href="' + target4 + '">' + elVal + '  laptops in laptops</a><li>' +
            '<li class="collection-item"><a class="black-text" href="' + target5 + '">' + elVal + ' catalog</a><li>' +
            '</ul>');
        if (charLength > 1) {
            if ((charLength % 2) == 0) {
                append.css({
                    "position": "absolute",
                    "top": (offset.top + elHeight),
                    "left": offset.left,
                    "width": elWidth,
                    "z-index": "9999",
                    "display": "none"
                });
                $('.autosugestedList').remove();
                append.appendTo('body').slideDown();
            }
        } else {
            $('.autosugestedList').remove();
        }
    });
    $('html').click(function () {
        $('.autosugestedList').remove();
    });

    $('.autoSuggestionBind').click(function (event) {
        event.stopPropagation();
    });

    //Profile Overlay 
    $('#overlayTrigger').click(function () {
        $('body').css({ "overflow": "hidden" });
        $('.footerLogo').css({ "z-index": "999" });
        $('#sidenav-overlay').trigger('click');
        $('.profileInfoSlider').slick('reinit');
        var imgtodrag = $(".layOutProfileImage");
        var profilePhoto = $('#overlayTrigger').find('img');
        profilePhoto.css({ opacity: 0 });
        $(this).css({"z-index": "-1" });
        $('.blueOverlay').slideDown('fast', function () {
            $('.profileInfoSlider').slick('reinit');
            $('.profileInfoSlider').animate({ opacity: 1 },1500);
        });
        var imgclone = profilePhoto.clone()
            .offset({
                top: profilePhoto.offset().top,
                left: profilePhoto.offset().left
            })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '5vw',
                'width': '5vw',
                'z-index': '9999',
                'border-radius': '50%'
            })
            .appendTo($('body'))
    .animate({
        'top': imgtodrag.offset().top ,
        'left': imgtodrag.offset().left ,
        'width': 75,
        'height': 75
    }, 600, 'easeInOutExpo');
        setTimeout(function () {

        }, 700);

        imgclone.animate({
            'width': "15vw",
            'height': "15vw"
        }, function () {
            $(this).detach();
            //     profilePhoto.css({ opacity: 0 });
            imgtodrag.css({ opacity: 1 });
        });
    });

    $('.overlayOkayButton').on('click', function () {
        $('.footerLogo').css({ "z-index": "0" });
        $('body').css({ "overflow": "auto" });
        var imgtodrag = $(".layOutProfileImage");
        var profilePhoto = $('#overlayTrigger');
        if (imgtodrag) {
            imgtodrag.css({ opacity: 0 });
            var imgclone = imgtodrag.clone()
                .offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                })
                .css({
                    'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '9999'
                })
                .appendTo($('body'))
                .animate({
                    'top': profilePhoto.offset().top + 10,
                    'left': profilePhoto.offset().left + 10,
                    'width': 75,
                    'height': 75
                }, 700, 'easeInOutExpo');
            setTimeout(function () {
                $('.blueOverlay').slideUp();
            }, 700);
            imgclone.animate({
                'width': 46,
                'height': 46
            }, function () {
                $(this).detach();
                profilePhoto.find('img').css({ opacity: 1});
                $('#overlayTrigger').css({ "z-index": '1' });
                $('.profileInfoSlider').animate({ opacity: 0 }, 100);
            });
        }
    });

    $('.profileInfoSlider').slick({
        dots: false,
        arrows: false,
        autoplay: false,
        fade: true,
        speed:700
    });
    $('#probtnScrollprev').click(function (e) {
        e.preventDefault();
        $('.profileInfoSlider').slick('slickNext');
    });

    $('#ProbtnScrollnext').click(function (e) {
        e.preventDefault();
        $('.profileInfoSlider').slick('slickPrev');
    });



    //Profile Overlay End
    $('.datepicker').pickadate({
        format: 'dd/mm/yyyy',
        selectMonths: true,
        selectYears: 5,
        min:false,
        container: document.body
    });



    //Load More Code
    $('.loadMoreBtn').click(function (e) {
        e.preventDefault();
        var el = $(this);
        el.hide();
        el.siblings('.preloader-wrapper').show();
        setTimeout(function () {
            el.show();
            el.siblings('.preloader-wrapper').hide();
            $('.hideForLoad')
            .velocity({ translateX: "-" + $(document).width() / 4 })
            .velocity('transition.slideLeftIn', {
                delay: 0, duration: 100, stagger: 100, complete: function () {
                    $(this).removeAttr('style').removeClass('hideForLoad');
                }
            });
        },500);
    });

    /*tempete trigger*/
    $('.template-modal-trigger').on("click", function () {
        $('body').append("<div class='tmp-ovelay-popup'></div>")
        .find('.tmp-ovelay-popup').velocity({ opacity: 1 }, {
            complete: function () {
                    $('.template-modal-popup').velocity({ translateY: 200, opacity: 0 })
                    .velocity({ translateY: 0, opacity: 1 }, { display: "block" }, 500);
            }
        });

        
        
    });
    $('.close-template-card').on("click", function () {
        $('.template-modal-popup').velocity({ translateY: -10, opacity: 0 }, {
            display: "none", complete: function () {
                $('.tmp-ovelay-popup').velocity({ opacity: 0 }).velocity({ display: "none" }).remove();
            }
        }, 500);
    })


    $('.iconStar').on("click", function (e) {
        e.stopPropagation();
        var checkStar = $(this).hasClass('fev');
        if (checkStar) {
            $(this).find('use').attr('xlink:href', '#icon_Star')
            $(this).removeClass('fev')
        } else {
            $(this).find('use').attr('xlink:href', '#icon_StarFill');
            $(this).addClass('fev')

        }
    });
	
    $('.iconWishList').on("click", function (e) {
        e.stopPropagation();
        var checkStar = $(this).hasClass('wish');
        if (checkStar) {
            $(this).find('use').attr('xlink:href', '#icon_Wishlist')
            $(this).removeClass('wish')
        } else {
            $(this).find('use').attr('xlink:href', '#icon_WishlistAdd');
            $(this).addClass('wish')

        }
    });

 
      

    try {

        $(".collection-list-view ").children('li')
        .velocity({ translateX: 20 }, {
            begin: function () {
                $('.collection-list-view').css({ 'overflowX': 'hidden' });
            }
        })
        .velocity('transition.slideRightIn', {
            delay: 100, duration: 200, stagger: 100, complete: function () {
                $(this).removeAttr('style').addClass('show-items');
                $('.collection-list-view').removeAttr('style');

                if ($('.collection-list-view').hasClass("highlightFirst")) {
                   
                    $('.highlightFirst').find('li:first-child').velocity({ backgroundColor: "#FFF9C4" })
                        .delay(5000)
                    .velocity({ backgroundColor: "#fff" }, {
                        complete: function () {
                            $(this).removeAttr('style');
                        }
                    })


                 }


            }
        });

        $('.recentChips > .chip ').velocity({ scaleX: 0, scaleY: 0 }).velocity('callout.pulse', {
            delay: 500, duration: 200, stagger: 100, complete: function () {
                $('.recentChips > .linkNormal').velocity({ scaleX: 1, scaleY: 1 }, { display: "inline" })
            }
        });

        $('#approvalPending li:first-child input[type = checkbox]').on('change', function () {
            if ($(this).is(':checked') == true) {

                $(this).parent().parent('ul').find('input[type = checkbox]').prop('checked', true);
                

            } else {
                $(this).parent().parent('ul').find('input[type = checkbox]').prop('checked', false);
            }
            
        });
        
        $('#approvalPending .modal-footer_new .btn-flat').eq(0).bind('click', function (e) {

            var checkSelectAll = $('#approvalPending li:first-child input[type = checkbox]');

            if (checkSelectAll.is(':checked') == true) {
                checkSelectAll.trigger('click');
            } else { return false;}
        });

        }
        catch (e) {
        return false;
        }



});

