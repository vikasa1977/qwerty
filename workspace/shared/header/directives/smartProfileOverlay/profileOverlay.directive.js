(function (angular) {
    var isOverlayLoad = false;
    'use strict';
    angular
        .module('SMART2').directive('smartProfileOverlay', ['$timeout', smartProfileOverlayFunc]);

    function smartProfileOverlayFunc() {
        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            link: function (scope, element, attrs) {
                function animateHeaderToOverlay() {
                    var imgtodrag = $(element).find(".layOutProfileImage");
                    var profilePhoto = $('#uniqueIdForHeaderProfile').find('img');
                    profilePhoto.css({ opacity: 0 });
                    $(this).css({ "z-index": "-1" });
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
                        'top': imgtodrag.offset().top,
                        'left': imgtodrag.offset().left,
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
                }
                function animationOverlayToHeader() {
                    var imgtodrag = $(element).find(".layOutProfileImage");
                    var profilePhoto = $('#uniqueIdForHeaderProfile').find('img');
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
                                'top': profilePhoto.offset().top,
                                'left': profilePhoto.offset().left,
                                'width': 75,
                                'height': 75
                            }, 700, 'easeInOutExpo');
                        imgclone.animate({
                            'width': 46,
                            'height': 46
                        }, function () {
                            $(this).detach();
                            profilePhoto.css({ opacity: 1 });
                            $('body').removeClass('is-overflowHidden');
                            $(element).slideUp();
                        });
                    }
                }

                attrs.$observe('isShow', function (newVal) {
                    if (newVal == 'true') {
                        $(element).slideDown();
                        $('body').addClass('is-overflowHidden');
                        animateHeaderToOverlay();
                        isOverlayLoad = true;
                    } else {
                        if (newVal == 'false' && isOverlayLoad) {
                            animationOverlayToHeader();
                            isOverlayLoad = false;
                        }
                    }
                });
            },
            templateUrl: 'shared/header/directives/smartProfileOverlay/profileOverlayTemplate.html'
        }
    }
})(angular);