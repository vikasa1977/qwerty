/**
 * this is modified for smart2 pdf version and pick up from following link.  
 * @preserve AngularJS PDF viewer directive using pdf.js.
 *
 * https://github.com/akrennmair/ng-pdfviewer 
 *
 * MIT license
 */
angular.module('SMART2')
.directive('pdfviewer', ["$compile", "$timeout",
    function ($compile, $timeout) {
        return {

            restrict: "E",
            transclude: true,
            template: '<div></div>',
            scope: {
                onPageLoad: '&',
                loadProgress: '&',
                displayAll: '@',
                id: '@',
                scale: '=',
                src:'@',
                pdfcontrol:'@',
                poupoutoption:'@',
                isPopout: '=?',
                onBreakPoints: '&'
            },
            link: function(scope, element, attrs){

                var div = element.find('div')[0],
            		control = '#' + scope.pdfcontrol;
                scope.pdf = null;
                scope.page = 0;
                scope.defualtScale = scope.scale;
                scope.totalpage = null;
                scope.currentpage = 1;
                scope.popoutTootip = "Pop Out";
                /*append control */

                if(control){

                    var ctrHTML = '<div ng-include="\'shared/directives/pdfJs/pdfControl.html\'" ></div>'
                 
                    $timeout(function(){
                        angular.element(control).html(ctrHTML);
                         $compile(angular.element(control).contents())(scope);

                    });

                    scope.ZoomIn = function (scale) {
                        var newScale = parseFloat(scale) + 0.2;
                        scope.scale = newScale
                       // scope.loadPDF(scope.src);
                        scope.renderAllpage();
                    };
                    scope.ZoomOut = function (scale) {
                        var newScale = parseFloat(scale) - 0.2;
                        if(!(newScale < 0.4)){
                            scope.scale = newScale ;
                           // scope.loadPDF(scope.src);
                            scope.renderAllpage();
                        }
                    };
                    scope.zoomReset = function () {
                        scope.scale = scope.defualtScale;
                       // scope.loadPDF(scope.src);
                        scope.renderAllpage();
                    };
                    scope.rotateLeft = function (currentRotated) {
                        var canvasAll = element.find('canvas');
                        
                        angular.forEach(canvasAll, function(v, k){
                            if (canvasAll[k].getAttribute('class') === 'rotate0') {
                                canvasAll[k].setAttribute('class', 'rotateMin90');
                            } else if (canvasAll[k].getAttribute('class') === 'rotateMin90') {
                                canvasAll[k].setAttribute('class', 'rotateMin180');
                            } else if (canvasAll[k].getAttribute('class') === 'rotateMin180') {
                                canvasAll[k].setAttribute('class', 'rotateMin270');
                            } else {
                                canvasAll[k].setAttribute('class', 'rotate0');
                            }
                        })
                    };
                    scope.rotateRight = function (currentRotated) {
                        var canvasAll = element.find('canvas');
                        angular.forEach(canvasAll, function(v, k){
                            if (canvasAll[k].getAttribute('class') === 'rotate0') {
                                canvasAll[k].setAttribute('class', 'rotate90');
                            } else if (canvasAll[k].getAttribute('class') === 'rotate90') {
                                canvasAll[k].setAttribute('class', 'rotate180');
                            } else if (canvasAll[k].getAttribute('class') === 'rotate180') {
                                canvasAll[k].setAttribute('class', 'rotate270');
                            } else {
                                canvasAll[k].setAttribute('class', 'rotate0');
                            }
                        })
                    };
                    scope.openPDFinPopup = function (popup) {
                        if (popup != true) {
                            var strgWindowFeature = 'directories=no,titlebar=no, toolbar=no, location=no, status=no, menubar=no,addressbar=0, top=0, left=20, height=703 ,width=978',
                        newwindow = window.open('index_launcher.html#/p2p/inv/pdfViewer', 'name', strgWindowFeature);
                            newwindow;

                            scope.popoutTootip = "Pop In";
                        } else {
                            scope.popoutTootip = "Pop Out";
                        }
                        scope.isPopout = !popup;
                        scope.$emit('openScannedInvInPopup', { message: !popup });
                    }
                }



                /*load pdf function*/
                scope.loadPDF = function(path) {
                    scope.pageNum = 1;
                    div.innerHTML = ''
                    PDFJS.getDocument(path).then(function(_pdf) {
                        scope.pdf = _pdf
                        if (scope.displayAll == "true") {
                            for (var i = 1; i <= scope.pdf.numPages ; i++) {
                                var num = i, canvas = document.createElement('canvas');
                                canvas.style.display = "block";
                                canvas.style.margin = "0 auto";
                                canvas.setAttribute('class', 'rotate0');
                                canvas.setAttribute('id', scope.id + '-page-' + i);
                                div.appendChild(canvas);


                            }
                            scope.renderAllpage(function(success) {
                                if (scope.loadProgress) {
                                    scope.loadProgress({state: "finished", loaded: 0, total: 0});
                                }
                            });
                        }
                        else{
                            scope.renderPage(scope.pageNum,  function(success) {
                                if (scope.loadProgress) {
                                    scope.loadProgress({state: "finished", loaded: 0, total: 0});
                                }
                            });
                        }
                         
                    },
                    function(message, exception) {
                    
                        if (scope.loadProgress) {
                            scope.loadProgress({state: "error", loaded: 0, total: 0});
                        }
                    }

                    );
            	  	
                }

                /* render the page */
                scope.renderPage = function(num, callback){
                    scope.pdf.getPage(num).then(function(page) {
                        scope.page = page
                        var scale = scope.scale;
                        var viewport = page.getViewport(scale);

                        var pageId = document.getElementById(scope.id + '-page-' + num)

                        var context = pageId.getContext('2d');
                        pageId.height = viewport.height;
                        pageId.width = viewport.width;
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext).then(
                    function() {
                        if (callback) {
                            callback(true);
                        }
                        scope.$apply(function() {
                            scope.onPageLoad({ page: num, total: scope.pdf.numPages });
                            scope.totalpage = scope.pdf.numPages;
                        });
                    },
                    function() {
                        if (callback) {
                            callback(false);
                        }
                        console.log('page.render failed');
                    }
                 );
                    });

                };

                /* render all page */
                scope.renderAllpage = function(callback){
                    for (var i = 1; i <= scope.pdf.numPages ; i++) {
                        var num = i ;
                        scope.renderPage(num, callback);
                    }
            	 		
                }


                scope.$watch('src', function(nv, ov){
                    if(nv != undefined || nv != '' || nv != null )
            		{
                         scope.loadPDF(scope.src);
                        
                    }

                });
                scope.scrollHeight = element.parent().outerHeight();
                
                function scrollBreakPoints(scrollTop, direction) {
                    if (attrs.scrollBreakPoints) {
                        var breakPConfig = JSON.parse(attrs.scrollBreakPoints),
                            BCkeys = Object.keys(breakPConfig),
                            srElements = element.find(BCkeys.join(","));

                        for (var z = 0; z < BCkeys.length; z++) {
                            element.find(BCkeys[z]).data("configSele", BCkeys[z]);
                        }

                        if (srElements.length > 0) {
                            srElements.each(function (i, e) {
                                var el = $(e),
                                    pos = el.position(),
                                    bConfig = breakPConfig[el.data("configSele")],
                                    touchValue = function () {
                                        var r;
                                        if (typeof bConfig.top == "number") {
                                            r = bConfig.top * parseInt(scope.scrollHeight);
                                        } else {
                                            r = parseInt(bConfig.top);
                                        }

                                        return r;
                                    }();

                                if (direction == "upward" && pos.top <= touchValue && !el.data("fired")) {
                                    el.data("fired", true);
                                    scope.onBreakPoints({
                                        e: {
                                            index: i,
                                            direction: "upward"
                                        }
                                    });
                                    scope.currentpage = i + 1;
                                    scope.$digest();
                                } else if (direction == "downward" && ((bConfig.reverse === true ? pos.top + el.outerHeight() : pos.top) >= (touchValue)) && el.data("fired")) {
                                    el.data("fired", false);
                                    scope.onBreakPoints({
                                        e: {
                                            index: i,
                                            direction: "downward"
                                        }
                                    });
                                    scope.currentpage = i + 1;
                                    scope.$digest();

                                };
                            });
                        };
                    };
                };
                setTimeout(function () {
                    var scrlTop;
                    var getEle = $(div).parent().parent();
                    getEle.bind("scroll", function (e) {
                        var _this = $(this),
                            currScrlTop = _this.scrollTop(),
                            dir;

                      
                        if (attrs.scrollBreakPoints) {
                            if (currScrlTop > scrlTop) {
                                dir = "upward";
                            } else if (currScrlTop < scrlTop) {
                                dir = "downward";
                            };
                            scrollBreakPoints(currScrlTop, dir);
                        }
                        scrlTop = currScrlTop;
                    });
                    scrlTop = getEle.scrollTop();
                });
             
            }
          
            
        }


    }

]);
