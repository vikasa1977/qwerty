//uigridcompatible
angular.module('SMART2')
    .directive("uigridCompatible", ['uiGridConstants', 'uiGridEditConstants', 'uiGridCellNavConstants', uigridCompatibleFunc]);

function uigridCompatibleFunc(uiGridConstants, uiGridEditConstants, uiGridCellNavConstants) {
    return {
        require: ['?^uiGrid', '?^uiGridRenderContainer'],
        restrict: 'A',
        link: function(scope, element, attrs, controllers) {
            var uiGridCtrl = controllers[0];
            var renderContainerCtrl = controllers[1];
            scope.gridApi = uiGridCtrl.grid.api;

            scope.selectTextEventBlocked = false;
            scope.selectTextEventBlockedTimeout = undefined;
            scope.onFocusIn = function(e) {
                $(e.target).parents(".ui-grid-cell").addClass("uiGridCompatible-focusin");
            };
            scope.onFocusOut = function(e) {
                $(e.target).parents(".ui-grid-cell").removeClass("uiGridCompatible-focusin");
                $(e.target).parents(".ui-grid-cell").removeClass("uiGridCompatible-focus");
                scope.stopEdit();
            };
            scope.onFocus = function(e) {
                $(e.target).parents(".ui-grid-cell").addClass("uiGridCompatible-focus");
            };
            scope.onBlur = function(e) {
                $(e.target).parents(".ui-grid-cell").removeClass("uiGridCompatible-focusin");
                $(e.target).parents(".ui-grid-cell").removeClass("uiGridCompatible-focus");
                scope.stopEdit();
            };
            window.previousFocusedELe;
            $(element).focusin(scope.onFocusIn);
            $(element).focusout(scope.onFocusOut);
            scope.$on(uiGridCellNavConstants.CELL_NAV_EVENT, function(evt, rowCol, modifierDown, originEvt) {
                // console.log("uiGridCellNavConstants.CELL_NAV_EVENT", arguments);
                setTimeout(function() {
                    var $element = $($(".ui-grid-cell-focus").parent()[0]);
                    if (window.previousFocusedELe) {
                        if (angular.equals($element, window.previousFocusedELe)) {
                            return;
                        } else {
                            window.previousFocusedELe = $element;
                        }
                    } else {
                        window.previousFocusedELe = $element;
                    }

                    var date = $element.find("input[type='date']");
                    var inputText = $element.find("input:text");

                    var selectDropdownText = "input:text.select-dropdown";
                    var inputDropdownText = $element.find(selectDropdownText);

                    var label = $element.children("label");

                    var a = $element.find("a");

                    var $inputChk = $element.find("input:checkbox");

                    if (label.length > 0) {
                        // label[0].focus();
                    } else {
                        label = $element;
                    }
                    if (date.length > 0) {
                        date[0].on("blur", scope.onBlur);
                        date[0].on("focus", scope.onFocus);
                        date[0].focus();
                    }
                    if (a.length > 0) {
                        var concealedEleCont = a.find("div#smartUigridConcealedEleCont");
                        if (concealedEleCont.length < 1) {
                            concealedEleCont = $("<div/>").attr("id", "smartUigridConcealedEleCont");
                            a.append(concealedEleCont);
                        } else {
                            concealedEleCont.empty();
                        }

                        var e = $(a[0]);
                        var c = $("<input/>").attr("type", "checkbox");
                        c.on("change", { ele: e }, function(event) {
                            event.data.ele.trigger("click");
                            return false;
                        });
                        c.append("&nbsp;");
                        concealedEleCont.append(c);
                        c.css({
                            position: "absolute",
                            left: "auto",
                            visibility: "visible",
                            opacity: 0.3,
                            height: 1,
                            width: 1,
                            padding: 0,
                            margin: 0,
                        });
                        c.on("blur", scope.onBlur);
                        c.on("focus", scope.onFocus);
                        c.focus();
                    }
                    if ($inputChk.length > 0) {
                        var concealedEleCont = label.find("div#smartUigridConcealedEleCont");
                        if (concealedEleCont.length < 1) {
                            concealedEleCont = $("<div/>").attr("id", "smartUigridConcealedEleCont");
                            label.append(concealedEleCont);
                        } else {
                            concealedEleCont.empty();
                        }

                        var e = $inputChk[0];
                        var c = $("<input/>").attr("type", "checkbox");
                        c.on("change", { ele: e }, function(event) {
                            angular.element(event.data.ele).scope().$apply(function() {
                                angular.element(event.data.ele).scope().ngModel = !angular.element(event.data.ele).scope().ngModel;
                            });
                            return false;
                        });
                        c.append("&nbsp;");
                        concealedEleCont.append(c);
                        c.css({
                            position: "absolute",
                            left: "auto",
                            visibility: "visible",
                            opacity: 0.3,
                            height: 1,
                            width: 1,
                            padding: 0,
                            margin: 0,
                        });
                        c.on("blur", scope.onBlur);
                        c.on("focus", scope.onFocus);
                        c.focus();
                    }
                    if (inputDropdownText.length > 0) {
                        var $selectDD = $($(".ui-grid-cell-focus").find(selectDropdownText)[0]);
                        if (!$selectDD.is(":focus")) {
                            $selectDD.on("blur", scope.onBlur);
                            $selectDD.on("focus", scope.onFocus);
                            $selectDD.focus();
                            $selectDD.trigger("click");
                        }
                    }
                    if (inputText.length > 0) {
                        $(inputText[0]).on("blur", scope.onBlur);
                        $(inputText[0]).on("focus", scope.onFocus);
                        $(inputText[0]).trigger("click");
                        inputText[0].select();
                    }
                }, 100);
            });

            scope.stopEdit = function(evt) {
                // no need to validate a dropdown - invalid values shouldn't be available in the list
                scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
            };

            element.on('keydown', function(evt) {
                switch (evt.keyCode) {
                    case uiGridConstants.keymap.ESC:
                        var inputText = $(element).find("input:text");
                        if (inputText.length > 0) {
                            $(inputText[0]).trigger("click");
                        }
                        evt.stopPropagation();
                        scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                        break;
                }
                if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                    evt.uiGridTargetRenderContainerId = renderContainerCtrl.containerId;
                    if (uiGridCtrl.cellNav.handleKeyDown(evt) !== null) {
                        scope.stopEdit(evt);
                    }
                } else {
                    //handle enter and tab for editing not using cellNav
                    switch (evt.keyCode) {
                        case uiGridConstants.keymap.ENTER: // Enter (Leave Field)
                        case uiGridConstants.keymap.TAB:
                            evt.stopPropagation();
                            evt.preventDefault();
                            scope.stopEdit(evt);
                            break;
                    }
                }
                return true;
            });
        }
    };
};
