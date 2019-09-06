'use strict';

angular
    .module('SMART2')

    .controller('p2pReqTemplateCtrl', ['$scope', '$rootScope', 'routeSvc', '$http', '$timeout', '$state', p2pReqTemplateCtrlFunc]);


function p2pReqTemplateCtrlFunc($scope, $rootScope, routeSvc, $http, $timeout, $state, storeService) {

    $scope.templateFor = $state.params.templatefor;
    $state.newUrl = '';

    var setURL = '',
        templateLink = '';
    if ($scope.templateFor == 'requisition') {
        setURL = 'p2p/req/models/shouldCostGeorgia.json';
        templateLink = 'p2p.req.new';
    } else if ($scope.templateFor == 'order') {
        setURL = 'p2p/order/models/shouldCostGeorgia.json';
        templateLink = 'p2p.order.new';
    };

    var getRespond = {
        method: 'GET',
        url: setURL
    };

    $scope.setTemplateData = [];



    $http(getRespond).then(function (response) {
        $scope.setTemplateData = response.data;
    }, function (error) {
        console.log(JSON.stringify(error));
    });


    $scope.getItemNum = [];

    /*showing footer on checkbox true*/

    $scope.checkboxIsTrue = false;
    var listCount = [];

    $scope.useSelectedTemplatefunc = function (ele) {

        if (ele == true) {
            $scope.checkboxIsTrue = true;
            listCount.push('0');

        } else {
            listCount.pop();
            if (listCount.length == 0) {
                $scope.checkboxIsTrue = false;

            }
        }

    }

    $state.showNewGraph = false;
    $state.productNameKetchup = false;
    $state.productNameMilk = false;
    $state.productNameFuleHouse = false;
    $state.productNamePretzelAnalysis=false;
    $state.productNameAcrylonitrile = false;

    $scope.goToPage = function (e) {
        if (e.Name == '4,795 SQ FT Restaurant') {
            $state.showNewGraph = false;
            $state.go('mdm.itemDetailsOne');

            // storeService.set('productType', 'service');
        } else if (e.Name == "SF Fillet Blocks" && e.supplierName !== "DF Foods") {
            $state.go('mdm.itemDetails');
            // storeService.set('productType', 'product');
        } else if (e.supplierName == "DF Foods") {
            $state.showNewGraph = true;
            $state.go('mdm.itemDetails');
        } else if (e.Name == "Ketchup Production") {
            $state.showNewGraph = false;
            $state.productNameKetchup = true;
            $state.productNameFoldingCartons = false;
            $state.go('mdm.itemDetails');
        }
        else if (e.Name == "Folding Cartons") {
            $state.showNewGraph = false;
            $state.productNameKetchup = false;
            $state.productNameFoldingCartons = true;
            $state.go('mdm.itemDetails', {
                mode: "FoldingCartoons"
            });
        } else if (e.Name == "Polyvinyl Chloride Resin") {
            $state.showNewGraph = false;
            $state.productNameKetchup = false;
            $state.productNameFoldingCartons = false;
            $state.productNamepolyviny = true;
            $state.go('mdm.itemDetails', {
                mode: "PolyvinylChlorideResin"
            });
        }
         else if (e.Name == "Milk") {
            $state.showNewGraph = false;
            $state.productNameKetchup = false;
            $state.productNameFoldingCartons = false;
            $state.productNameMilk = true;
            $state.go('mdm.itemDetails');
        } else if (e.Name == "Fuel Hose & Tube Assembly Analysis") {
            $state.showNewGraph = false;
            $state.productNameKetchup = false;
            $state.productNameFoldingCartons = false;
            $state.productNameMilk = false;
            $state.productNameFuleHouse = true;
            $state.go('mdm.itemDetails');
        }
        else if (e.Name == "Pretzel Analysis") {
            $state.showNewGraph = false;
            $state.productNameKetchup = false;
            $state.productNameMilk = false;
            $state.productNameFuleHouse = false;
            $state.productNamePretzelAnalysis = true;
            $state.go('mdm.itemDetails');
        } else if (e.Name == "Acrylonitrile by Ammoxidation") {
            $state.showNewGraph = false;
            $state.productNameKetchup = false;
            $state.productNameMilk = false;
            $state.productNameFuleHouse = false;
            $state.productNameAcrylonitrile = true;
            $state.go('mdm.itemDetails');
        }
    }

    $scope.getTemplateIndex = function (index) {
        var checkindex = index + 1;
        if (checkindex == 1) {
            return $scope.slideDataIndexTemp.first
        } else if (checkindex == 2) {
            return $scope.slideDataIndexTemp.second
        } else if (checkindex == 3) {
            return $scope.slideDataIndexTemp.third
        }

    }
    /* poup command*/
    $scope.userthisTemplate = function (e) {
        $state.go(templateLink);
        $scope.tempPopup = false;
    }

    $scope.isActive = false;
    $scope.showMe = false;
    $scope.hideClose = false;
    $scope.showSearch = function () {
        $scope.isActive = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };

    $scope.hideSearch = function () {
        $scope.isActive = false;
        $scope.hideClose = false;

    };

    $scope.selectedItems = 6;
    $scope.checkedAllTemp = function (check, index) {
        $scope.fillpartial = false;
        if (check) {
            for (var i = 0; i < $scope.setTemplateData[index].tempAttr.length; i++) {
                $scope.setTemplateData[index].tempAttr[i].isChecked = true;
            }
            $scope.selectedTempCount = $scope.setTemplateData[index].tempAttr.length;
        } else {
            for (var i = 0; i < $scope.setTemplateData[index].tempAttr.length; i++) {
                $scope.setTemplateData[index].tempAttr[i].isChecked = false;
            }
            $scope.selectedTempCount = 0;
        }
        $scope.slideObj.list = $scope.setTemplateData;
        $scope.slideObj.list[index].isCheckedAll = check;
        $scope.slideObj.list[index].selectedTempCount = $scope.selectedTempCount;
    }
    $scope.selectedTempCount = 0;
    $scope.addItem = function (slideIndex, currentItemIndex, check) {
        $scope.slideObj.list[slideIndex].tempAttr[currentItemIndex].isChecked = check;
        var countTempList = 0;
        for (var i = 0; i < $scope.slideObj.list[slideIndex].tempAttr.length; i++) {
            if ($scope.slideObj.list[slideIndex].tempAttr[i].isChecked == true) {
                countTempList++;
            }
        }
        if (countTempList === 0) {
            $scope.slideObj.list[slideIndex].fillpartialFlag = false;
            $scope.slideObj.list[slideIndex].isCheckedAll = false;
        } else if (countTempList === $scope.slideObj.list[slideIndex].tempAttr.length) {
            $scope.slideObj.list[slideIndex].fillpartialFlag = false;
            $scope.slideObj.list[slideIndex].isCheckedAll = true;
        } else {
            $scope.slideObj.list[slideIndex].fillpartialFlag = true;
        }
        $scope.slideObj.list[slideIndex].selectedTempCount = countTempList;
    };
    $scope.p2pTempFlag = false;

    // $scope.showTemplateCall = function (index) {       
    //     $scope.p2pTempFlag = true;
    //     $scope.slideObj = {
    //         list: $scope.setTemplateData,
    //         index: index,
    //         src: 'p2p/shared/views/templateAttibuteContent.html'
    //     };
    // };

    $scope.closeTemplatePreviewPopup = function () {
        $scope.p2pTempFlag = false;
    }
    ///*slider*/
    //$scope.openPopuFlag = false;
    //  $scope.tempPreview = '',
    // $scope.tempCurrent = '',
    //      $scope.tempNext = '';
    //$scope.opentempPopup = function (current) {
    //    $scope.openPopuFlag = true;
    //    $scope.tempPreview = current - 1,
    //    $scope.tempCurrent = current,
    //     $scope.tempNext = current + 1;

    //    $scope.previewFlag = true;
    //    $scope.openSlideModal = 'slide-view-modal--open';

    //    $scope.slideDataIndex = $scope.tempCurrent || 0;
    //    $scope.slideDataIndexTemp = {
    //        'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
    //        'second': $scope.slideDataIndex,
    //        'third': $scope.slideDataIndex + 1
    //    }


    //}



    //$scope.info = $scope.setTemplateData;




    //            $scope.slideHide1 = false;
    //            $scope.slideHide2 = false;
    //            $scope.slideHide3 = false;

    //            $scope.slide1 = 'slide-prev';
    //            $scope.slide2 = 'slide-current';
    //            $scope.slide3 = 'slide-next';

    //            $scope.slideDataIndex = $scope.tempCurrent || 0;
    //            $scope.slideDataIndexTemp = {
    //                'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
    //                'second': $scope.slideDataIndex,
    //                'third': $scope.slideDataIndex + 1
    //            }
    //            $scope.getIndexforContent = function (index) {
    //                switch (index) {
    //                    case '0':
    //                        return slideDataIndexTemp.first;
    //                        break;
    //                    case '1':
    //                        return slideDataIndexTemp.second;
    //                        break;
    //                    case '2':
    //                        return slideDateIndexTemp.third;
    //                }

    //            }

    //            var hideCall = function () {
    //            if ($scope.slide1 == 'slide-prev' || $scope.slide1 == 'slide-next') {
    //            $scope.slideHide1 = true;
    //            } else { $scope.slideHide1 = false; }

    //            if ($scope.slide2 == 'slide-prev' || $scope.slide2 == 'slide-next') {
    //            $scope.slideHide2 = true;
    //            } else { $scope.slideHide2 = false; }

    //            if ($scope.slide3 == 'slide-prev' || $scope.slide3 == 'slide-next') {
    //            $scope.slideHide3 = true;
    //            } else { $scope.slideHide3 = false; }
    //            };
    //            hideCall();
    //            var setCurrentTitle = function () {
    //                $timeout(function () {
    //                   // $scope.selectedDoc = { title: ($scope.info[$scope.slideDataIndex].title) };
    //                }, 500);

    //            };

    //            $scope.next = function () {

    //            if ($scope.slideDataIndex == ($scope.info.length - 1)) {
    //            return;
    //            }
    //            $scope.slideDataIndex = $scope.slideDataIndex + 1;
    //           // $scope.nextSlideTitle = $scope.info[$scope.slideDataIndex].title;
    //            $scope.selectedItems = '0';

    //            if (($scope.slide1 == 'slide-prev')) {
    //            $scope.slide1 = 'slide-next';
    //            } else if ($scope.slide1 == 'slide-current') {
    //            $scope.slide1 = 'slide-prev';
    //            } else {
    //            $scope.slide1 = 'slide-current';
    //            $scope.slideDataIndexTemp = {
    //                'first': $scope.slideDataIndex,
    //                'second': $scope.slideDataIndex + 1,
    //                'third': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1)
    //            }


    //            setCurrentTitle();
    //            }
    //            if (($scope.slide2 == 'slide-prev')) {
    //            $scope.slide2 = 'slide-next';
    //            }
    //            else if ($scope.slide2 == 'slide-current') {
    //            $scope.slide2 = 'slide-prev';
    //            } else {
    //            $scope.slide2 = 'slide-current';
    //            $scope.slideDataIndexTemp = {
    //                'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
    //                'second': $scope.slideDataIndex,
    //                'third': $scope.slideDataIndex + 1
    //            }
    //            setCurrentTitle();
    //            }
    //            if (($scope.slide3 == 'slide-prev')) {
    //            $scope.slide3 = 'slide-next';
    //            }
    //            else if ($scope.slide3 == 'slide-current') {
    //            $scope.slide3 = 'slide-prev';
    //            }
    //            else {
    //            $scope.slide3 = 'slide-current';
    //            $scope.slideDataIndexTemp = {
    //                'first': $scope.slideDataIndex + 1,
    //                'second': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
    //                'third': $scope.slideDataIndex
    //            }
    //            setCurrentTitle();
    //            }
    //            hideCall();
    //            $scope.getSlideDataIndexFirst = $scope.slideDataIndexTemp.first;
    //            $scope.getSlideDataIndexSecond = $scope.slideDataIndexTemp.second;
    //            $scope.getSlideDataIndexThird = $scope.slideDataIndexTemp.third;
    //            };
    //            $scope.prev = function () {
    //                $scope.selectedItems = '0';
    //            if ($scope.slideDataIndex == 0) {
    //            return;
    //            }
    //            $scope.slideDataIndex = $scope.slideDataIndex - 1;
    //            //$scope.prevSlideTitle = $scope.info[$scope.slideDataIndex].title;
    //            if (($scope.slide1 == 'slide-prev')) {

    //            $scope.slide1 = 'slide-current';
    //            $scope.slideDataIndexTemp = {
    //                'first': $scope.slideDataIndex,
    //                'second': $scope.slideDataIndex + 1,
    //                'third': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1)
    //            }
    //            setCurrentTitle();
    //            } else if ($scope.slide1 == 'slide-current') {
    //            $scope.slide1 = 'slide-next';
    //            } else {
    //            $scope.slide1 = 'slide-prev';
    //            }
    //            if (($scope.slide2 == 'slide-prev')) {

    //            $scope.slide2 = 'slide-current';
    //            $scope.slideDataIndexTemp = {
    //                'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
    //                'second': $scope.slideDataIndex,
    //                'third': $scope.slideDataIndex + 1
    //            }
    //            setCurrentTitle();
    //            } else if ($scope.slide2 == 'slide-current') {
    //            $scope.slide2 = 'slide-next';
    //            } else {
    //            $scope.slide2 = 'slide-prev';
    //            }
    //            if (($scope.slide3 == 'slide-prev')) {

    //            $scope.slide3 = 'slide-current';
    //            $scope.slideDataIndexTemp = {
    //                'first': $scope.slideDataIndex + 1,
    //                'second': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
    //                'third': $scope.slideDataIndex
    //            }
    //            setCurrentTitle();
    //            } else if ($scope.slide3 == 'slide-current') {
    //            $scope.slide3 = 'slide-next';
    //            } else {
    //            $scope.slide3 = 'slide-prev';
    //            }
    //            hideCall();
    //            $scope.getSlideDataIndexFirst = $scope.slideDataIndexTemp.first;
    //            $scope.getSlideDataIndexSecond = $scope.slideDataIndexTemp.second;
    //            $scope.getSlideDataIndexThird = $scope.slideDataIndexTemp.third;
    //            };

    //            /* MODIFY RFX SETTINGS POPUP */
    //            $scope.showModifyRFXPopup = false;
    //            $scope.onPopupHide = function () {
    //            $scope.showModifyRFXPopup = false;
    //            };
    //            /* MODIFY RFX SETTINGS POPUP ENDS */

    //            $scope.getSlideDataIndexFirst = $scope.slideDataIndexTemp.first;
    //            $scope.getSlideDataIndexSecond = $scope.slideDataIndexTemp.second;
    //            $scope.getSlideDataIndexThird = $scope.slideDataIndexTemp.third;

    //            $scope.showPreview = function () {
    //                angular.element('body').css('overflow', 'hidden');
    //                $scope.openPopuFlag = true;
    //            $scope.openSlideModal = 'slide-view-modal--open';
    //            };
    //            $scope.closeSlideView = function () {
    //                angular.element('body').css('overflow', '');
    //            $scope.openSlideModal = '';
    //            $scope.openPopuFlag = false;
    //            }



    $scope.selectAllTemple = function (index, isCheck) {

        var tempAttr = $scope.setTemplateData[index].tempAttr;
        if (selectedTemplateallitem != true) {

            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = false;
            }
        } else {

            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = true;
            }
        }

    };


    /* 
	  HEADER SEARCH INTRACTION
	  NEED TO CHANGE ITS WORKING
	*/
    $scope.showSearchHeader = function () {
        //$scope.mysearchHeight = { width: '1000px' };
        this.isActiveHeader = true;
        this.focusSearchHeader = true;
        this.hideCloseHeader = true;
    }
    $scope.hideSearchHeader = function () {
        //$scope.mysearchHeight = { width: '100%' };
        this.isActiveHeader = false;
        this.focusSearchHeader = false;
        this.hideCloseHeader = false;
    }
    /* end here*/

    /* FILTER POPOVER in TEMPLATE POPUP STARTS */
    $scope.closePopOver = function () {
        angular.element(document).triggerHandler('click');
    };
    /* FILTER POPOVER in TEMPLATE POPUP ENDS */
};