(function () {
	'use strict';
    angular.module('SMART2')
       .filter('highlightSearch', ['$sce', function ($sce) {
             return function (text, phrase) {
                 if (phrase)
                     text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span class="highlighted">$1</span>');

                 return $sce.trustAsHtml(text);
             }
         }])
	  .directive('smartSharedWithPopup', ['notification', '$filter', '$timeout', '$sce', smartSharedWithPopupFunc]);

    function smartSharedWithPopupFunc(notification, $filter, $timeout, $sce) {
	    return {
	        restrict: 'E',
	        transclude: true,
	        scope: {
	            show: '=',
	            hide: '&',
	            config: '=',
	            doneCallback: '&'
	        },
	        controller: ["$scope", "$element", "$attrs", "$translate", function ($scope, $element, $attrs, $translate) {
	                /*search item*/
	                $scope.isActive = false;
	                $scope.searchInput = { "text": "" };
	                $scope.hideClose = false;
	                $scope.showSearch = function () {
	                    $scope.isActive = true;
	                    $scope.hideClose = true;
	                    $element.find(".searchInputField").focus();
	                };
	                $scope.hideSearch = function () {
	                    if ($scope.searchInput.text == "") {
	                        $scope.isActive = false;
	                        $scope.hideClose = false;
	                        $timeout(function () {
	                            angular.element("searchField").focus();
	                        }, 100)
	                    } else {
	                        $scope.searchInput.text = '';
	                        $scope.hideClose = false;
	                    }
	                }
	            //event on keyDown
	                $scope.isEnterPressed = false;
	                $scope.keyDownCallback = function (e) {
	                    if (e.keyCode == 13) {
	                        if ($scope.searchInput.text.length >= 3) {
	                            $scope.filteredDataCount = $scope.filteredData.tml.length;
	                            $scope.isEnterPressed = true;
	                        }
	                    }
	                    else if (e.keyCode == 27 || e.keyCode == 112 || e.keyCode == 113 || e.keyCode == 114 | e.keyCode == 115 || e.keyCode == 116 || e.keyCode == 117 || e.keyCode == 118 || e.keyCode == 119 || e.keyCode == 120 || e.keyCode == 121 || e.keyCode == 122 || e.keyCode == 123 || e.keyCode == 45 || e.keyCode == 9 || e.keyCode == 20 || e.keyCode == 16 || e.keyCode == 17 || e.keyCode == 18 || e.keyCode == 91 || e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
	                        if ($scope.isEnterPressed == true) {
	                            $scope.isEnterPressed = true;
	                        }
	                    }
	                    else {
	                        $scope.isEnterPressed = false;
	                    }

	                }
	                // Start: Multiselect for team members master list
	                $scope.teamMemberMasterHead = {
                        'fillpartial':false,
	                     'check': false
	          };
	        $scope.teamMemberMasterSelected = false;
	        $scope.listCount = function (list) {
	            return $filter('filter')(list, { check: true }).length;
	        };
                //event select all
	        $scope.onChangeMasterTeamMember = function (arg) {
	             var teamMemberlength = $scope.teamMemberMasterList.length;
	              $scope.teamMemberMasterHead.fillpartial = false;
	               for (var incre = 0; incre < teamMemberlength; incre++) {
	                 $scope.teamMemberMasterList[incre].check = arg;
	             }
	             if (arg) {
	                 $scope.teamMemberMasterSelected = true;
	             }
	             else {
	                 $scope.teamMemberMasterSelected = false;
	              }
	            /* condition for check already Shared or not */
	             if (alreadyShared) {
	                 $scope.isChangeed.disabled = false;
	             } else {
	                 if (arg)
	                     $scope.isChangeed.disabled = false;
	                 else
	                     $scope.isChangeed.disabled = true;
	             }
	             
	           };
	            //event checkbox
	         $scope.teamMemberMasterListChange = function (arg, index) {
	            
	             var teamMemberlength = $scope.teamMemberMasterList.length,
	                 selectListCount = $scope.listCount($scope.teamMemberMasterList);
	                
	                 if (arg == true) {
	                     $scope.teamMemberMasterSelected = true;
	                     if (selectListCount === teamMemberlength) {
	                         $scope.teamMemberMasterHead.fillpartial = false;
	                         $scope.teamMemberMasterHead.check = true;
	                     } else {
	                         $scope.teamMemberMasterHead.fillpartial = true;
	                         $scope.teamMemberMasterHead.check = false;
	                     }
	                 }
	                 else {
	                     
	                     if (selectListCount == 0) {
	                         $scope.teamMemberMasterSelected = false;
	                         $scope.teamMemberMasterHead.check = false;
	                         $scope.teamMemberMasterHead.fillpartial = false;
	                     }
	                 }
	                 if (selectListCount <= 0) {
	                     $scope.showSelectedMasterList = false;
	                     $scope.showSelected.check = false;
	                 }
                    /* condition for check already Shared or not */
	                 if (alreadyShared) {
	                     $scope.isChangeed.disabled = false;
	                 } else {
	                     if (arg !== $scope.config[index].check)
	                         $scope.isChangeed.disabled = false;
	                     else
	                         $scope.isChangeed.disabled = true;
                    }
	                
                 // end here
	           };
	          //boolan for selected listing.
	            $scope.showSelectedMasterList = false;
	            $scope.filteredData = { "tml": [], "selectedData":[]}
	            $scope.showSelected = { "check": false };
                //event for show selected callback
	           $scope.showSelectedCallback = function (isChecked) {
	              $scope.selectedTeamMemberMasterList = $filter('filter')($scope.teamMemberMasterList, { check: true });
	              if (isChecked)
	                  $scope.showSelectedMasterList = true;
	              else
	                  $scope.showSelectedMasterList = false;
	            }

	            //event on done
	           $scope.sharedWithSelected = function () {
	               angular.forEach($scope.teamMemberMasterList, function (value, key) {
	                   if (value.check != $scope.config[key].check) {
	                       $scope.config[key].check = value.check
	                   }
	               });
	               var selectedMembers = $filter('filter')($scope.config, { check: true });
	               $scope.doneCallback({ selected: selectedMembers});
	           };
                //event on hide popup
	           $scope.hidePopup = function (e) {
	                initialize();
					$scope.showSelected.check = false;
					$scope.showSelectedMasterList = false;
					$scope.show = false;
					$scope.searchInput.text = "";
					$scope.isActive = false;
					$scope.hideClose = false;
					$scope.hide(e);
					$scope.isChangeed.disabled = true;
				}
	    

	        // Start: Data Storage and retreival
	          $scope.teamMemberMasterList = [];
	        
	          $scope.isChangeed = { "disabled":true };
	          var highlight = false,
                  teamMemberListReset,
               /*intialize option*/
            alreadyShared = false,
           initialize = function () {
               $scope.teamMemberMasterList = angular.copy($scope.config);
               checkSelectedItems();
               alreadyShared = false;
              var configSelected =  $filter('filter')($scope.config, { check: true }).length;
            
               if (configSelected != 0) {
                   alreadyShared = true;
               }
           },
              /*event for check selected*/
             checkSelectedItems = function () {
                 if ($scope.listCount($scope.teamMemberMasterList) == $scope.teamMemberMasterList.length) {
                     $scope.teamMemberMasterHead.check = true;
                     $scope.teamMemberMasterHead.fillpartial = false;
                 } else if (($scope.listCount($scope.teamMemberMasterList) > 0) && ($scope.listCount($scope.teamMemberMasterList) != $scope.teamMemberMasterList.length)) {
                    
                     $scope.teamMemberMasterHead.check = false;
                     $scope.teamMemberMasterHead.fillpartial = true;
                 } else {
                     $scope.teamMemberMasterHead.check = false;
                     $scope.teamMemberMasterHead.fillpartial = false;
                 }
             };


	          $scope.totalDisplayed = 35; // limit for data show
              /*scroll end event*/  
	          $scope.smartScrollEnd = function () {
	              $timeout(function () {
	                  if ($scope.totalDisplayed <= $scope.teamMemberMasterList.length)
	                      $scope.totalDisplayed = $scope.totalDisplayed + 35;
	              });
	          };
	            /* watch for config change*/
	          $scope.$watch("config", function () {
	              initialize();
	          }, true);
	        }
            ],
	        template: '<smart-popup template-url="shared/directives/sharedPopup/popupShareWith.html" show=" {{ show }}" on-hide="hidePopup(e)"></smart-popup>'

	    };

	}


})();