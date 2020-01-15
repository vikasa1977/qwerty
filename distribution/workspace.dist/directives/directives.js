/*!
 * jQuery animated slider
 * A simple slider that can be animated using CSS transitions (see example)
 * by David Wallin
 * MIT License
 *
 *
 * USAGE:
 * $("myULList").AnimatedSlider( { } );
 * Note: Behavior may be undefined if you have less than 3 items.
 *
 * options = {
 *      infiniteScroll: true,
 *      visibleItems: 3,        // 3 or 5. if 5, next_item_2 and previous_item_2 will be used.
 *      changedCallback: function(animatedSliderObject, currentItem),       // called every time the slide changes
 *      willChangeCallback: function(animatedSliderObject, currentItem),    // called before the change transition
 *      userChangedCallback: function(animatedSliderObject, currentItem),   // called after the transition
 * };
 *
 *
 * you can get access to the AnimatedSlider object by:
 * var slider = $("myULList").data("AnimatedSlider");
 *
 *
 */

/*
	CSS Classes Needed:   (see animated-slider.css)
		previous_hidden
		next_hidden
		previous_item  
		previous_item_2 *optional
		next_item 
		next_item2 *optional
		current_item

	also, li needs to have transitions set up.
*/


(function ($, window, document, undefined) {

    // Create the defaults once
    var pluginName = 'AnimatedSlider',
		defaults = {
		    infiniteScroll: true,
		    visibleItems: 3,
		    changedCallback: null,
		    willChangeCallback: null,
		    userChangedCallback: null,
		    useTransitions: true
		};

    var supportsTransitions = _supportsTransitions();

    function Plugin(element, options) {
        this.element = element;
        this.jqElem = $(element);
        this.items = $(this.element).children("li");
        this.numSliderItems = this.items.length;
        this.currentItem = 0;
        this.commandQueue = [];

        this.jqElem.data(pluginName, this);

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.inTransition = false;
        this.init();


    }

    Plugin.prototype.init = function () {
        var pluginThis = this;

        if (pluginThis.options.useTransitions) {
            this.jqElem.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
				function () {
				    if (pluginThis.inTransition) {
				        pluginThis.inTransition = false;

				        if (pluginThis.options.changedCallback)
				            pluginThis.options.changedCallback(pluginThis, pluginThis.currentItem);

				        setTimeout(function () {
				            pluginThis.doCommandQueue();
				        }, 50);



				    }
				});
        } else {
            this.items.css('transition', 'none');
            this.items.find("*").css('transition', 'none');
        }

        if (this.options.prevButton) {
            $(this.options.prevButton).on('click', function (e) {
                e.preventDefault();
                pluginThis.prevItem();
            });
        }

        if (this.options.nextButton) {
            $(this.options.nextButton).on('click', function (e) {

                e.preventDefault();
                pluginThis.nextItem();
            });
        }


        this.setItem(0);

        // If the slider is hidden initially, it may not get the event which ends the transition. Force it to false.
        this.inTransition = false;

    };

    Plugin.prototype.setItem = function (n) {
        var sliderItems = this.items;

        // remove existing state classes
        sliderItems.removeClass();
        var wrapFuncNone = function (n) {
            return n;
        };
        var wrapFunc;

        if (this.options.infiniteScroll)
            wrapFunc = this._wrapIndex;
        else
            wrapFunc = wrapFuncNone;

        $('.card-_count-wraper').html('');
        for (var i = 0; i < sliderItems.length; i++) {

            //Add dots

            var moveTo = n - i;
            var dots = $('<li class="card_count-dots" data-refe="' + moveTo + '"></li>');
            $('.card-_count-wraper').append(dots);

            // remove all classes
            var item = sliderItems.eq(i);

            if (i == n) {
                item.addClass("current_item");
                dots.addClass('current-dot');
            } else if (i < n) {
                item.addClass("previous_hidden");
            } else if (i > n) {
                item.addClass("next_hidden");
            }
        }
        if (sliderItems.length != 1) {
            if (this.options.infiniteScroll) {
                sliderItems.eq(this._wrapIndex(n - 1)).removeClass().addClass("previous_item");
                sliderItems.eq(this._wrapIndex(n + 1)).removeClass().addClass("next_item");

                if (this.options.visibleItems == 3) {
                    if (sliderItems.length > 3) {
                        sliderItems.eq(this._wrapIndex(n - 2)).removeClass().addClass("previous_hidden");
                        sliderItems.eq(this._wrapIndex(n + 2)).removeClass().addClass("next_hidden");
                    }
                } else if (this.options.visibleItems == 5) {
                    sliderItems.eq(this._wrapIndex(n - 2)).removeClass().addClass("previous_item_2");
                    sliderItems.eq(this._wrapIndex(n + 2)).removeClass().addClass("next_item_2");

                    sliderItems.eq(this._wrapIndex(n - 3)).removeClass().addClass("previous_hidden");
                    sliderItems.eq(this._wrapIndex(n + 3)).removeClass().addClass("next_hidden");
                }

            } else {
                if (n - 1 >= 0)
                    sliderItems.eq(n - 1).removeClass().addClass("previous_item");
                if (n + 1 < this.numSliderItems)
                    sliderItems.eq(n + 1).removeClass().addClass("next_item");

                if (this.options.visibleItems == 5) {
                    if (n - 2 >= 0)
                        sliderItems.eq(n - 1).removeClass().addClass("previous_item_2");
                    if (n + 2 < this.numSliderItems)
                        sliderItems.eq(n + 1).removeClass().addClass("next_item_2");

                }
            }
        }
        currentItem = n;


        if (supportsTransitions && this.options.useTransitions) // Modernizr.csstransitions
        {
            this.inTransition = true;

            if (this.options.willChangeCallback)
                this.options.willChangeCallback(this, this.currentItem);

        } else {
            if (this.options.willChangeCallback)
                this.options.willChangeCallback(this, this.currentItem);

            if (this.options.changedCallback)
                this.options.changedCallback(this, this.currentItem);

        }


    }

    Plugin.prototype.nextItem = function () {

        if (this.inTransition) {
            this.commandQueue.push("nextItem");
            return;
        }

        if (this.options.infiniteScroll || this.currentItem < this.numSliderItems - 1) {
            this.currentItem += 1;
            this.currentItem = this._wrapIndex(this.currentItem);
            this.setItem(this.currentItem);

            if (this.options.userChangedCallback)
                this.options.userChangedCallback(this, this.currentItem);
        }
    }

    Plugin.prototype.prevItem = function () {
        if (this.inTransition) {
            this.commandQueue.push("prevItem");
            return;
        }

        if (this.options.infiniteScroll || this.currentItem >= 1) {
            this.currentItem -= 1;
            this.currentItem = this._wrapIndex(this.currentItem);
            this.setItem(this.currentItem);

            if (this.options.userChangedCallback)
                this.options.userChangedCallback(this, this.currentItem);
        }
    }

    Plugin.prototype.clearAnimations = function () {
        this.inTransition = false;
        this.commandQueue = [];
    }

    Plugin.prototype.doCommandQueue = function () {
        if (this.commandQueue.length == 0)
            return;

        var cmd = this.commandQueue.splice(0, 1)[0];

        this[cmd]();
    }


    Plugin.prototype.refresh = function () {
        this.items = $(this.element).children("li");
        this.numSliderItems = this.items.length;

        this.setItem(this.currentItem);

        clearAnimations();
    }

    Plugin.prototype._wrapIndex = function (n) {
        // note: we're assuming that these indexes aren't getting too crazy out of bounds.

        if (n < 0) {
            n += this.numSliderItems;
        }

        if (n >= this.numSliderItems)
            n -= this.numSliderItems;

        return n;
    }

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
					new Plugin(this, options));
            }
        });
    }

    function _supportsTransitions() {
        var b = document.body || document.documentElement;
        var s = b.style;
        var p = 'transition';
        if (typeof s[p] == 'string') {
            return true;
        }

        // Tests for vendor specific prop
        v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
		p = p.charAt(0).toUpperCase() + p.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof s[v[i] + p] == 'string') {
                return true;
            }
        }
        return false;
    }

})(jQuery, window, document);
angular.module('SMART2')
  .constant('slickCarouselConfig', {
      method: {},
      event: {}
  })
.directive('smartCardsView', ['$timeout', '$parse', 'slickCarouselConfig', 'commonUtilities', '$rootScope', function ($timeout, $parse, slickCarouselConfig, commonUtilities, $rootScope) {
    return {
        restrict: 'E',
        replace: false,
        transclude: true,
        scope: true,
        terminal: true,
        link: function (scope, element, attrs) {
            scope.htmlWrappers = attrs.htmlWrappers ? attrs.htmlWrappers : 'slick';
            scope.elementClass = typeof attrs.elementContainer === 'undefined' ? 'landing-cards' : attrs.elementContainer + ' .landing-cards';
            var onBreakPoint = attrs.onBreakPoint ? $parse(attrs.onBreakPoint) : false;
            var slickTool, slickt;
            $timeout(function () {

                var slickt = angular.element('.' + scope.elementClass).on('init', function (event, slick) {
                    if (onBreakPoint) {
                        onBreakPoint(scope, {
                            e: slick
                        })
                    }
                }).slick({
                    htmlWrappers: !attrs.htmlWrappers ? 'slick' : attrs.htmlWrappers,
                    dots: attrs.dots === 'true',
                    slidesToShow: attrs.slidesToShow != null ? parseInt(attrs.slidesToShow, 10) : 4,
                    slidesToScroll: attrs.slidesToScroll != null ? parseInt(attrs.slidesToScroll, 10) : 4,
                    infinite: attrs.infinite !== 'false',
                    dots: true,
                    infinite: false,
                    responsive: responsive || void 0,
                });


                slickt.on('breakpoint', function (event, slick, currentSlide, nextSlide) {
                    if (onBreakPoint) {
                        onBreakPoint(scope, {
                            e: slick
                        })
                    }
                });
                angular.element('.landing-cards').on('afterChange', function () {
                    setTimeout(function () {
                        var returnString = angular.element('.slick-track').attr('style').split(';')[2].split(":")[1].trim();
                        var transformProp = returnString.match(/\(([\w+\W+]+)\)/)[1].split(',');
                        transformProp[2] = '1px';
                        var updateProp = "translate3d(" + transformProp.join(',') + ")";
                        angular.element('.slick-track').css('transform', updateProp);
                    }, 500);
                });

                $rootScope.$on('cardCallTheMethodOutside', function (callmethos, parameter) {
                    slickt.slick('slickGoTo', parameter);
                });
                if (scope.HC) scope.HC.init = true; // initializing highchart
            });

            scope.$on('AllRepeaterElement', function (attrs, element) {
                if($(element).hasClass('team-card-list-item')) {
                    if (slickTool) {
                        angular.element('.' + scope.elementClass).slick('unslick');
                        slickTool = 0;
                    }
                }
            });

            scope.$on('LastRepeaterElement', function (attrs, element) {
                if ($(element).hasClass('team-card-list-item')) {
                    //  $timeout(function () {
                    slickTool = 1;
                    slickt = angular.element('.' + scope.elementClass).on('init', function (event, slick) {
                        if (onBreakPoint) {
                            onBreakPoint(scope, {
                                e: slick
                            })
                        }
                    }).slick({
                        htmlWrappers: !attrs.htmlWrappers ? 'slick' : attrs.htmlWrappers,
                        dots: attrs.dots === 'true',
                        slidesToShow: attrs.slidesToShow != null ? parseInt(attrs.slidesToShow, 10) : 3,
                        slidesToScroll: attrs.slidesToScroll != null ? parseInt(attrs.slidesToScroll, 10) : 3,
                        infinite: attrs.infinite !== 'false',
                        dots: true,
                        infinite: false,
                        responsive: responsive || void 0,
                    });
               }
            });
            scope.dataSet = false;
          
            scope.$on('removeSlide', function (e, Options) {
               var slickIndex;

                if (!scope.dataSet) {
                    scope.dataSet = true;
                }

                for (slickIndex = 0; slickIndex < scope.newContractTeam.length; slickIndex++) {
                    if (scope.newContractTeam[slickIndex].id === Options.teamId) {
                        scope.newContractTeam.splice(slickIndex, 1);
                        break;
                    }
                }
                angular.element('.' + scope.elementClass).slick('slickRemove', slickIndex);
                if (scope.newContractTeam.length == 0) {
                    e.targetScope.lastdeleteItem = true;
                }
           });
         scope.removeSlide = function (e) {
                var index = $('.slick-slide').index($(e.currentTarget).closest('.slick-slide'));
                angular.element('.' + scope.elementClass).slick('slickRemove', index);
            };

         var responsive = scope.$eval(attrs.responsive);
            scope.$watch('allCardsContentInitial', function (newV, oldV) {
                if (newV) {
                    scope.$parent.$parent.allCardsContent = commonUtilities.translateDocumentKeys(newV, true);
                    scope.refresh = scope.$parent.$parent.allCardsContent.length;
                }
            }, true);
        },
        templateUrl: 'shared/directives/cardsView/cardsViewTemplate.html'
    };
}]);

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
            scope.cardItemListPadding = 10;
            scope.slickDotsHeight = 55;
            scope.miniFilterID = commonUtilities.uniqueIDGenerator();
            i = 0;
            attrs.$observe('cardIdentifer', function (newVal, oldVal) {
                scope.setBucketColor();

            });

            scope.cardListHeight = angular.element('body').outerHeight() - (angular.element('header .nav-wrapper').outerHeight() + angular.element('.extra-nav-wrap').outerHeight() + 37 + 62 + parseInt($('.dev_cardParent').css('margin-top')) + parseInt($('.dev_cardParent').css('margin-bottom')) + scope.cardItemListPadding + scope.slickDotsHeight + parseInt(angular.element('.choose_slider_items').css('padding-top'))) + 'px';
            scope.cardHeight = { height: parseInt(scope.cardListHeight) + 'px' };

            attrs.$observe('cardTabs', function (newVal, oldVal) {
                if (JSON.parse(attrs.cardTabs))
                    scope.cardListHeight = angular.element('body').outerHeight() - (angular.element('header .nav-wrapper').outerHeight() + 40 + angular.element('.extra-nav-wrap').outerHeight() + 87 + 62 + parseInt($('.dev_cardParent').css('margin-top')) + parseInt($('.dev_cardParent').css('margin-bottom')) + scope.cardItemListPadding + scope.slickDotsHeight + parseInt(angular.element('.choose_slider_items').css('padding-top'))) + 'px';
                scope.cardListH = { height: parseInt(scope.cardListHeight, 10) + 90 + 'px' };
            });

            scope.setBucketColor = function () {
                if (i % 6 === 0) {
                    scope.cardClassByDocType = 'card-header color-one';
                } else if (i % 6 === 1) {
                    scope.cardClassByDocType = 'card-header color-two';
                } else if (i % 6 === 2) {
                    scope.cardClassByDocType = 'card-header color-three';
                } else if (i % 6 === 3) {
                    scope.cardClassByDocType = 'card-header color-four';
                } else if (i % 6 === 4) {
                    scope.cardClassByDocType = 'card-header color-five';
                } else if (i % 6 === 5) {
                    scope.cardClassByDocType = 'card-header color-six';
                }
                i++;
            };
            var prevColor = '';
            scope.setIconColor = function (index, parentIndex) {
                if (index == 0) {
                    var getCurrentPercent = parentIndex % 5;
                    switch (getCurrentPercent) {

                        case 0:
                            prevColor = 1
                            return 'icon-color-one';
                            break;
                        case 1:
                            prevColor = 0
                            return 'icon-color-five';
                            break;
                        case 2:
                            prevColor = 4
                            return 'icon-color-four';
                            break;
                        case 3:
                            prevColor = 3
                            return 'icon-color-three';
                            break;
                        case 4:
                            prevColor = 2;
                            return 'icon-color-two';
                            break;
                    }

                }
                else {


                    switch (prevColor) {

                        case 0:
                            prevColor = 1
                            return 'icon-color-one';
                            break;
                        case 1:
                            prevColor = 2
                            return 'icon-color-two';
                            break;
                        case 2:
                            prevColor = 3
                            return 'icon-color-three';
                            break;
                        case 3:
                            prevColor = 4
                            return 'icon-color-four';
                            break;
                        case 4:
                            prevColor = 0;
                            return 'icon-color-five';
                            break;
                    }


                }
            };

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

        },
        templateUrl: 'shared/directives/cardsView/cardItemTemplate.html'
    };
}]);

angular.module('SMART2').directive('scrollTracker', function () {
    return {
        restrict: 'EAC',
        scope: {
            setParentClass: '=',
        },
        link: function (scope, element, attrs) {

        },
        template: ''
    };
});
angular.module('SMART2').controller('globalSearch', ['$scope', '$rootScope', 'routeSvc', '$location',
function ($scope, $rootScope, routeSvc, $location) {

    $scope.searchValue = $location.$$search.search;

    $scope.onKeyDown = function (event) {

        $scope.searchValue = event.target.value;
        //call controller function to trigger search on Enter key press
        if (event.which === 13) {
            $rootScope.$broadcast('searchText', {
                data: event.target.value
            });
        }
    }

    $scope.searchBox = function () {
        //call controller function to trigger search on click of Anchor tag
        routeSvc.goTo('#searchResult?search=' + $scope.searchValue);
        $rootScope.$broadcast('searchText', {
            data: $scope.searchValue
        });
    }

    $scope.clearSearch = function () {
        $scope.searchValue = '';
    }
}]);

angular.module('SMART2').directive('smartGlobalTextfield', ['routeSvc',
function (routeSvc) {
    return {
        restrict: 'E',
        replace: true,
        scope: false,
        link: function (scope, element, attrs) {

            element.bind("keydown keypress", function (event) {

                //Route to Search result page on Enter Key press
                if (event.which === 13) {
                    routeSvc.goTo('#searchResult?search=' + event.target.value);
                }
            });
        },
        controller: 'globalSearch',
        templateUrl: 'shared/directives/smartGlobalTextfield/smartGlobalTextfieldTemplate.html'
    };
}]);

(function (angular) {
    'use strict';
    angular.module('SMART2').directive('documentRoute', ['$timeout', '$http', '$compile', '$templateCache', 'APPCONSTANTS', 'routeSvc', function ($timeout, $http, $compile, $templateCache, APPCONSTANTS, routeSvc) {
        return {
            restrict: 'AE',
            scope: {
                linker: "="
            },
            link: function (scope, element, attrs) {

                var onDemandLoadedTemplateForProduct;
                var emptyCreateConfig = {
                    "msg": "",
                    "options": []
                }, defaultConfig;
                getDefaultJson();
                var dataMapperReq;
                function getDefaultJson() {
                    var getRespond = {
                        method: 'GET',
                        //           url: APPCONSTANTS.userPreferences.URLs.ContentURL + 'smartcontent/clientConfig/create/config.json'
                        url: 'shared/models/createConfig.json'
                    };
                    if (!dataMapperReq) {
                        dataMapperReq = $http(getRespond).then(function (response) {
                            defaultConfig = response.data['createConfig'];
                        }, function (error) {
                            console.log(JSON.stringify(error));
                        });
                    }
                }
                function includeOnDemandTemplate(url, docID) {
                    if (url) {
                        element.append($compile($templateCache.get(url))(scope));
                        onDemandLoadedTemplateForProduct = docID;
                    }
                };

                scope.isCreationActive = false;
                scope.animateDelayFlag = false;
                scope.animationRemoved = false;
                var callCreationPhase = function (config) {
                    var configuration = config;
                    scope.creationPhaseConfiguration = configuration.options;
                    scope.creationMsg = configuration.msg;
                    openOverlay();
                }

                scope.closeCreationPhase = function (result, e) {
                    e.stopPropagation();
                    if (typeof result == "object" && result.disable === false) {
                        (result.url) ? redirection(result.url) : (scope.linker.callback) ? scope.linker.callback(result) : null;
                    }
                    closeOverlay();
                }

                function redirection(url) {
                    routeSvc.goTo(url);
                }

                function removeOnDemandCreatedTemplate() {
                    onDemandLoadedTemplateForProduct = null;
                    element.find("[ng-controller]").remove();
                }

                function closeOverlay() {
                    scope.animateDelayFlag = false;
                    $timeout(function () {
                        scope.isCreationActive = false;
                    });
                }

                function openOverlay() {
                    scope.isCreationActive = true;
                    scope.animationRemoved = true;
                    scope.animateDelayFlag = true;
                    $timeout(function () {
                        scope.animationRemoved = false;
                    });
                }

                function evaluateLinkerBindings(config) {
                    _.each(config, function (value, key, object) {
                        epressionBinder(value, key, object);
                        if (key == "options") {
                            _.each(config.options, function (value, key, object) {
                                _.each(value, function (value, key, object) {
                                    epressionBinder(value, key, object);
                                })
                            })
                        }
                    });
                    return config;
                }

                function epressionBinder(value, key, object) {
                    if (typeof value === "string" && value.indexOf("(") > -1 && angular.isFunction(scope.linker[value.split("(")[0]])) {
                        object[key] = scope.linker[value.split("(")[0]](object);
                    }
                }

                function checkForRedirectionOnParentLevel(product) {
                    var config = angular.copy((typeof _clientSpecificConfigSettings !== 'undefined' && _clientSpecificConfigSettings['createConfig'][product.docID]) ? _clientSpecificConfigSettings['createConfig'][product.docID] : defaultConfig ? defaultConfig[product.docID] : defaultConfig);
                    if (config) {
                        if (product.docID != onDemandLoadedTemplateForProduct) {
                            removeOnDemandCreatedTemplate();
                            includeOnDemandTemplate(config.onDemandTemplate, product.docID);
                        }
                        config = evaluateLinkerBindings(config);
                        if (product.href && !config.url) {
                            config.url = product.href;
                        }
                        if (config.url) {
                            redirection(config.url);
                        } else {
                            callCreationPhase(config);
                        }
                    }
                    else {
                        redirection(product.href);
                    }
                };

                if (scope.linker) {
                    scope.linker.setActiveProduct = function (product) {
                        checkForRedirectionOnParentLevel(product);
                    }
                    scope.linker.closeCreateOverlay = function () {
                        closeOverlay();
                    }
                    scope.linker.openCreateOverlay = function () {
                        openOverlay();
                    }
                }

            },
            templateUrl: 'shared/directives/documentRoute/documentRouteTemplate.html'
        };
    }]);
})(angular);

angular.module('SMART2').controller('searchBoxCtrl', ['$scope', '$window', 'requestClicked', searchBoxCtrlFunc]);

function searchBoxCtrlFunc($scope, $window, requestClicked) {

    angular.element('.searchWrapper').css({
        opacity: 1
    });

    $scope.$watch(function () {
        return requestClicked.getProperty();
    }, function (newVal, oldVal) {

        if (newVal !== oldVal) {
            $scope.isRequestClicked = newVal;
            if (newVal)
                angular.element('.searchWrapper').addClass("searchWrapper--hide");
            else
                angular.element('.searchWrapper').removeClass("searchWrapper--hide");

        }
    });
}