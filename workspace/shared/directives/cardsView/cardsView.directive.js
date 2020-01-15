//angular.module('SMART2').directive('smartCardsView', ['commonUtilities', function(commonUtilities) {
//    return {
//        restrict: 'E',
//        replace: true,
//        transclude: true,
//        scope :true,
//        link: function (scope, element, attrs) {
           
//            var time = new Date().getTime();
//            scope.cardsViewId = 'cardsView-' + time;
//            scope.prevButtonId = 'btnPrev-' + time;
//            scope.nextButtonId = 'btnNext-' + time;
//            var cardSlider, isCardReady = false;

//            //Animated Slider Start

//            // $('#' + scope.cardsViewId).velocity({ opacity: 1 }, 100);
//            // $('#' + scope.prevButtonId).velocity({ opacity: 1 }, 100);
//            // $('#' + scope.nextButtonId).velocity({ opacity: 1 }, 100);
            
//            var cardsView = element.find('.landing-cards');
//            var nextButton = element.find('.scroll_card_next_button');
//            var prevButton = element.find('.scroll_card_prev_button')

//            cardsView.velocity({ opacity: 1 }, 100);
//            prevButton.velocity({ opacity: 0 }, 100);
//            nextButton.velocity({ opacity: 0 }, 100);

//            cardSlider = element.find('.landing-cards').AnimatedSlider({
//                prevButton: prevButton,
//                nextButton: nextButton,
//                visibleItems: 3,
//                infiniteScroll: true,
//                willChangeCallback: function (obj, item) {
//                    $('.card-_count-wraper .card_count-dots').click(function () {
//                        var tomv = $(this).data('refe');
//                        var comVal = Math.abs(tomv);
//                        var newAnimation;

//                        if (applyIncrementatlSpeed) {
//                            if (comVal > 6) {
//                                newAnimation = "acceleratedFastAnimate";
//                            } else if (comVal > 2) {
//                                newAnimation = "fastAnimate";
//                            } else {
//                                newAnimation = "";
//                            }
//                        }

//                        if (tomv < 0) {
//                            for (i = 0; i < comVal; i++) {
//                                nextButton.trigger('click');
//                            }
//                        } else {
//                            for (i = 0; i < comVal; i++) {
//                                prevButton.trigger('click');
//                            }
//                        }

//                        scope.$apply(function () {
//                            scope.animationSpeed = newAnimation;
//                        });

//                    });
//                }
//            });

//            isCardReady = true;

//            cardsView.find('.card').click(function () {
//                var el = $(this).parent('li');
//                if (el.hasClass('previous_item')) {
//                    prevButton.trigger('click');
//                    return;
//                }
//                if (el.hasClass('next_item')) {
//                    nextButton.trigger('click');
//                    return;
//                }
//            });
      
////Animated Slider End 

//            scope.$watch('allCardsContentInitial', function (newV, oldV) {
//                if (newV) {
//                    prevButton.velocity({ opacity: 1 }, 100);
//                    nextButton.velocity({ opacity: 1 }, 100);
//                    scope.$parent.$parent.allCardsContent = commonUtilities.translateDocumentKeys(newV, true);          
//                     scope.refresh = scope.$parent.$parent.allCardsContent.length;
//                }
//            }, true);

//            var applyIncrementatlSpeed = attrs.incrementalSpeed;

            
//            /*
//             * Refresh cards
//             */
//            scope.$watch('refresh', function(newValue) {
//                if(newValue && cardSlider) {
//                    setTimeout(function() {
//                        cardsView.data("AnimatedSlider").refresh();  
//                    }, 500);
//                }
//            });
//        },
//        templateUrl: 'shared/directives/cardsView/cardsViewTemplate.html'
//    };
//}]);

angular.module('SMART2').directive('smartCardItem', ['commonUtilities', function (commonUtilities) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function (scope, element, attrs) {
            // Binding functions of UTILS 
            scope.setValue = commonUtilities.setValue;
            scope.parallaxMode = true;
            scope.setValueColor = commonUtilities.setValueColor;

            scope.cardItemId = 'card-item-' + new Date().getTime();
            scope.cardContentId = 'card-content-' + new Date().getTime();

            scope.miniFilterID = commonUtilities.uniqueIDGenerator();
            attrs.$observe('cardIdentifer', function (newVal, oldVal) {
                scope.cardClassByDocType = commonUtilities.setBucketColor(newVal);
                scope.cardBucketImageByDocType = commonUtilities.setBucketImage(newVal);
            });

            if (!scope.importantAttribLimit)
                scope.importantAttribLimit = 2;
            scope.cardHeaderTemplate = attrs.headerTemplate || 'shared/view/cards/slidingCardsHeader.html';
            scope.cardContentTemplate = attrs.contentTemplate || 'shared/view/cards/collectiveCards.html';
            scope.cardFooterTemplate = attrs.footerTemplate || 'shared/view/cards/slidingCardsFooter.html';

            scope.isExpanded = true;
            scope.showHeader = true;

            attrs.$observe('expand', function (value) {
                scope.isExpanded = scope.$eval(value);
                scope.showHeader = !scope.isExpanded;
             });

            scope.dropDownConfig = {
                inDuration: 300,
                outDuration: 225,
                constrain_width: false, // Does not change width of dropdown to that of the activator
                hover: false, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'right' // Displays dropdown with edge aligned to the left of button
            };

            scope.cardListLazyLoad = function (e) {
                scope.$apply(function () {
                    scope.parallaxMode = true;
                });
                
            };

            scope.cardListScrollAtTop = function (e) {
                scope.$apply(function () {
                    scope.parallaxMode = false;
                });
            };

            scope.cardListScrolled = function (e) {
                scope.$apply(function () {
                    scope.parallaxMode = true;
                });
            };

        },
        templateUrl: 'shared/directives/cardsView/cardItemTemplate.html'
    };
}]);
