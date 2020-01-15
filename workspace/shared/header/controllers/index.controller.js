(function (angular) {
	'use strict';

	angular
		.module('SMART2')
		.service('redirectState', [function () {
			var timer = null;
			return {
				setState: function (a) {
					this.state = a;
					clearTimeout(timer);
					timer = setTimeout(function () {
						this.state = '';
					}.bind(this), 2000);
				}
			};
		}])
        .service('storeService', function () {
	        this.storage = {};
	        this.get = function (name) {
		        return this.storage[name];
	        };
	        this.set = function (name, value) {
		        this.storage[name] = value;
	        };
        })
		.controller('headerCtrl', ['$scope', '$rootScope', '$translate', '$sce', '$compile', 'APPCONSTANTS', '$state', 'notification', '$timeout', 'redirectState', 'requestClicked', 'storeService', headerCtrlFunc]);

	function headerCtrlFunc($scope, $rootScope, $translate, $sce, $compile, APPCONSTANTS, $state, notification, $timeout, redirectState, requestClicked, storeService) {

        if(localStorage.selectedTheme != null && localStorage.selectedTheme != "null" && localStorage.selectedTheme != undefined){
            if(JSON.parse(localStorage.selectedTheme).path == null)
            {
                angular.element("#theme")[0].disabled = true;
                document.querySelector('#theme').setAttribute('href', "");
            }
            else
            {   
                document.querySelector('#theme').setAttribute('href', JSON.parse(localStorage.selectedTheme).path);
                angular.element("#theme")[0].disabled = false;
            }
        }

		$scope.showMenu = true;
		$scope.showUserProfileOverlay = false;
		$scope.showProfileOverlayCall = function () {
			$scope.showUserProfileOverlay = true;
		};

		//$scope.bookmark = "test";
		$rootScope.showHeader = false;
		$scope.$on('callOverlayWithParapater', function (event, para) {
			$scope.showUserProfileOverlay = true;
		});

		$scope.gotoHomePage = function () {
			redirectState.setState('home');
			if ($scope.showUserProfileOverlay) {
				$scope.showUserProfileOverlay = false;
				$timeout(function () {
					window.location.href = 'index_launcher.html#/platform';
				}, 500);
			} else {
			    window.location.href = 'index_launcher.html#/platform';
			 
			    if (requestClicked.getProperty()) {
			        window.location.reload();
			    }
			  
			}
		}

		$scope.hideProfileOverlayCall = function (para) {
			$scope.showUserProfileOverlay = false;
			switch (para) {
				case 'gotoProfile': $timeout(function () {
					$state.go('user.profile');
				}, 1800);
					break;
				case 'contract': $timeout(function () {
					$state.go('contract.new', { "mode": "contractdata" });
				}, 1800);
					break;
				case 'pending': $timeout(function () {
					$state.go('workQueue');
				}, 1800);
					break;
				case 'opportunities': $timeout(function () {
					$state.go('analyseReport');
				}, 1800);
					break;
				case 'catalogcart': $timeout(function () {
					$state.go('catalog.requestercatalog.cart');
				}, 1800);
					break;
				case 'supplire': $timeout(function () {
					$state.go('supplier.profile', {
						'pagefor': 'Evertek'
					});
				}, 1800);
					break;
				case 'pricesheet': $timeout(function () {
					$state.go('sourcing.rfx.pricesheet', {
						'mode': 'edit',
						'title': 'IT Hardware'
					});
				}, 1800);
					break;
                case 'cancel':
                    if(storeService.get("SmartCoachSwitch"))
                    {
                        setTimeout(function () {
                            $rootScope.$broadcast('startHomeIntroEvent');
                            //startHomeIntro();
                        }, 1000);
                    }
                break;
			}
		}
		$scope.bookMarkdropDownConfig = {
			inDuration: 300,
			outDuration: 225,
			constrain_width: false,
			hover: true,
			gutter: 0,
			belowOrigin: false,
			alignment: 'left'
		};

		$scope.bookmarkPopup = true;
		// $scope.openAddBookmark = function() {
		//     $scope.bookmarkPopup = true;
		// }

		$scope.viewTypeCallback = function () {
			$rootScope.$broadcast('viewTypeClick', {
				any: {}
			});
		};

		$scope.pageName = $rootScope.pageName;

		$scope.userName = APPCONSTANTS.userPreferences.UserBasicDetails.UserName;

		// TODO: remove label references
		/*LABELS*/
		// $rootScope.$label = labels;
		// var lowerCased = {};
		// $.each(labels, function(i, v) {
		//     lowerCased[i] = v.toLowerCase();
		// });

		// $rootScope.$label_L = lowerCased;
		// var upperCased = {};
		// $.each(labels, function(i, v) {
		//     upperCased[i] = v.toUpperCase();
		// });
		// $rootScope.$label_U = upperCased;

		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		// var firstUpperCased = {};
		// $.each(labels, function(i, v) {
		//     firstUpperCased[i] = capitalizeFirstLetter(v);
		// });
		// $rootScope.$label_FU = firstUpperCased;
		// // $scope.label=labels;

   
		$scope.showAddBppkmarkPopupHideCall = function (item) {
			$scope.bookmarkPopupFlag = false;
		}
		$scope.addAnnouncementOnHideCallback = function (item) {
			$rootScope.addAnnouncementPopup = false;
		}
		$scope.addBookmarkOnHideCallback = function (item) {
			$rootScope.bookmarkPopupFlag1 = false;
		}

		$scope.label = {
			"workspace": $translate.instant("WORKSPACE"),
			"profile": capitalizeFirstLetter($translate.instant("profile")),
			"bookmark": capitalizeFirstLetter($translate.instant("bookmark")),
			"notification": capitalizeFirstLetter($translate.instant("notification")),
			"navigation": capitalizeFirstLetter($translate.instant("navigation")),
			"settings": capitalizeFirstLetter($translate.instant("settings")),
			"logout": capitalizeFirstLetter($translate.instant("logOut")),
			"home": capitalizeFirstLetter($translate.instant("home"))
		};

		$scope.localizationTest = $translate.instant('testLoc');

		/***/
		$scope.subHeader = false;

		$scope.isShow = true;
		$scope.searchbox = function () {
			$scope.isShow = $scope.isShow ? false : true;
		}

		var navigationNum = 0;
		$scope.stateOfSideBar = true; // True mean open
		$scope.applyActiveClass = [false, false, false]; // Length of array in Bool values as per number of tabs

		function activateClassArray(tabIndex) {
			var emptyArr = [];
			for (var i = 0; i < $scope.applyActiveClass.length; i++) {
				if (tabIndex == i + 1)
					emptyArr.push(true);
				else
					emptyArr.push(false);
			}
			$scope.applyActiveClass = emptyArr;
		}

		function deactivateClassArray() {
			var emptyArr = [];
			for (var i = 0; i < $scope.applyActiveClass.length; i++) {
				emptyArr.push(false);
			}
			$scope.applyActiveClass = emptyArr;
		}


		$scope.sideNavComp = [];

		/*navigation js*/
		$('.right-side-nav').sideNav({
			menuWidth: 320,
			edge: 'right',
			closeOnClick: false
		});

		$scope.test = true;
		$rootScope.$on('itemDelet', function (event, args) {

			$rootScope.itemFromDelete = args.itemFrom;

			if ($rootScope.itemFromDelete != undefined) {

				var mssage;

				switch ($rootScope.itemFromDelete) {
					case 'req':
						mssage = "Requsition document deleted successfully."
						break;
					case 'Order':
						mssage = "Order document deleted successfully."
						break;

				}


				var successMsg = {
					type: "success",
					message: mssage,
					buttons: [
						{
							title: "OK",
							result: "ok"
						}
					]
				}


				$timeout(function () {
					notification.notify(successMsg, function (responce) {
						var result = responce.result;
						return false;
					});
				}, 1000)

			};
		});



		//CONFIGURATION TO GENERATE HEADER BUTTONS AND ITS SIDE PANES
		// TODO: remove notification Count variable with value from service
		$scope.buttonsObjects = {
			userProfile: {
				name: 'userProfile',
				class: '',
				icon: "https://gepmtstorage.blob.core.windows.net/smartcontent/workspace/shared/theme/images/dummyImage.jpg",  // "https://gepmtstorage.blob.core.windows.net/smartcontent/workspace/shared/theme/images/user_default_SMALL.PNG", 
				tooltip: $translate.instant('Profile'),
				active: false,
				isUserProfile: true,
				href: "#/user/profile"
			},
			bookmark: {
				name: 'bookmark',
				class: 'nav-bookmark',
				notification: undefined,
				icon: "#icon_Bookmark",
				tooltip: $translate.instant('My Bookmarks'),
				active: false,
				showPane: false,
				templateURL: 'shared/sideNav/views/bookmarSideNav.html',
				data:{ 
					smart: [{
					'bookMarkName': "Create Contract",
					'bookMarkUrl': '#/contract/new',
					'type': 'Smart',
                    'isfavourite': true
				}, {
					'bookMarkName': "My RFX",
					'bookMarkUrl': '#/sourcing/rfx/new',
					'type': 'Smart',
					'isfavourite': false
				}, {
					'bookMarkName': "Laptops for the Team",
					'bookMarkUrl': '#/catalog/requestercatalog/search',
					'type': 'Smart',
					'isfavourite': false
				}, {
					'bookMarkName': "Payment Requests created by Me",
					'bookMarkUrl': '#/p2p/order/new',
					'type': 'Smart',
					'isfavourite': false
				}],
					external: [{
					'bookMarkName': "Create Contract",
					'bookMarkUrl': '#/contract/new',
					'type': 'External'
				}, {
					'bookMarkName': "My RFX",
					'bookMarkUrl': '#/sourcing/rfx/new',
					'type': 'External'
				}, {
					'bookMarkName': "Laptops for the Team",
					'bookMarkUrl': '#/catalog/requestercatalog/search',
					'type': 'External'
				}, {
					'bookMarkName': "Payment Requests created by Me",
					'bookMarkUrl': '#/p2p/order/new',
					'type': 'External'
				}],
				}
			},
			notification: {
				name: 'notification',
				class: 'nav-notification',
				notification: APPCONSTANTS.userPreferences.NAVButtonsAccessRights.Task, //>99?'99+':APPCONSTANTS.userPreferences.NAVButtonsAccessRights.Task,
				icon: "#icon_Annoucement",
				tooltip: $translate.instant('Announcement'),
				active: false,
				showPane: false,
				templateURL: 'shared/sideNav/views/notificationSideNav.html',
				data: {
					internal: [{
						'title': 'A corporation is a company or group of people',                        
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor sit amet, tantas luptatum dignissim sit in, ius eu lorem soleat',
						'type': 'Internal',
						'attachments': [{name: 'file1',type: 'pdf',size: '456 KB'}]
					}, {
						'title': 'A corporation is a company or group of people',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolum dignissim sit in, ius eu lorem soleat',
						'type': 'Internal',
						'attachments': [{name: 'file1',type: 'pdf',size: '456 KB'}]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'Internal',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'Internal',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'Internal',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'Internal',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'Internal',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}],
					external: [{
						'title': 'A corporation is a company or group of people',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor sit amet, tantas luptatum dignissim sit in, ius eu lorem soleat',
						'type': 'External',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or group of people',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolum dignissim sit in, ius eu lorem soleat',
						'type': 'External',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'External',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'External',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'External',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'External',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}, {
						'title': 'A corporation is a company or...',
						'image': 'internal_img.jpg',
						'publishDate': '2 Feb 2016',
						'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
						'type': 'External',
						'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }]
					}]
				}
			},
			help: {
				name: 'Help',
				class: 'nav-support',
				icon: "#icon_Help",
				tooltip: $translate.instant('Support'),
				position: "bottom",
				active: false,
				templateURL: 'shared/sideNav/views/helpCenter.html',
				href: "https://smartqc.gep.com/HelpCenter/HelpCenter?oloc=101"
			},
			navigation: {
				name: 'menu',
				class: 'nav-sidenav',
				notification: undefined,
				icon: "#icon_MenuHmbrgr",
				tooltip: $translate.instant('Navigation'),
				position: "left",
				active: false,
				showPane: false,
				templateURL: 'shared/sideNav/views/menuSideNav.html',
				data: [{
					'navTitle': 'SEARCH',
					'navIcon': '#icon_Search',
					'type': 'input'
				}]
			}
		};
		if (APPCONSTANTS.userPreferences.UserBasicDetails.IsAdmin) {
			$scope.buttonsObjects.navigation.data.push({
				'navTitle': 'Configure',
				'navIcon': '#icon_Settings',
				'type': 'label',
				'href': "https://smartdev.gep.com/UserSettings?oloc=101"
			});
		}
		if ($scope.buttonsObjects.notification) {
			$scope.buttonsObjects.notification.notification = $scope.buttonsObjects.notification.data.internal.length + $scope.buttonsObjects.notification.data.external.length;
		}
		// var htmlStr= '<smart-popup template-url="shared/sideNav/views/addBookmark.html" show="{{$root.bookmarkPopup}}" type="small" style="z-index: 1003" callback="$root.closePopup"/>';
		// $scope.togglePopup=function(){
		//     console.log("from header.controller.js");
		//     var appendHTML = angular.element(htmlStr);
		//     var compiled=$compile(appendHTML);
		//     angular.element("body").append(compiled(angular.element("body").scope()));
		//     // compiled(angular.element("body").scope());
		//     $rootScope.bookmarkPopup=true;
		//     // $compile(angular.element("body"));
		// };

		// $scope.deleteBookmark =function(data){
		//     $scope.buttonsObjects.bookmark.data = _.without($scope.buttonsObjects.bookmark.data, _.findWhere($scope.buttonsObjects.bookmark.data, {bookMarkUrl: data.bookMarkUrl}));
		// };

		$scope.logout = $translate.instant('logOut');
		$scope.buttonLabel = $translate.instant("add") + ' ' + $translate.instant("as") + ' ' + $translate.instant("bookmark");

		$scope.lastHeaderBtnClicked = false;

		$scope.resetPanes = function (isLast) {
		   
			var rginRight = "";
			console.log("deactivateButtons...");
			_.each($scope.buttonsObjects, function (item, key, collection) {
				item.active = false;
				item.showPane = false;
			});
			if ($scope.lastHeaderBtnClicked) {
				$scope.lastHeaderBtnClicked = false;
				//if ($('.fixed-action-btn').length && $('#sidenav-overlay').length) {
				//    $('.fixed-action-btn').removeAttr('style');
				//}
			} else {
				$scope.lastHeaderBtnClicked = isLast;
				//console.log("open")
				//if ($('.fixed-action-btn').length) {
				//    $('.fixed-action-btn').css('z-index', '-1');
				//}
			}
			$scope.toggleOverlay(false);

			// if(val===!0){
			_.each($scope.buttonsObjects, function (value, key, list) {
				value.marginRight = "";
				
			});
			// }
			//if ($('.fixed-action-btn').length  && $('#sidenav-overlay').length) {
			//   $('.fixed-action-btn').removeAttr('style');
			//}
		};

		$scope.toggleOverlay = function (val) {
			$scope.sidePaneVisible = val;
		};

		// $scope.setAllPanesVisibility = function(visibility) {
		//     _.each($scope.buttonsObjects, function(item, key, collection) {
		//         console.log(arguments);
		//         item.showPane = visibility;
		//     });
		// };

		$scope.navOpen = function (navigationNum, thisEvent) {
			var $this = angular.element(thisEvent.currentTarget).parent();
			if ($('#overlay1').css('display') == 'block') {
				setTimeout(function () {
					$('.overlayOkayButton').trigger('click');
				}, 200);
			}
			if ($this.hasClass('currentActive')) {
				if ($this.is(':last-child')) {
					$this.parent().removeClass('nav-slide-active');
				}
				$this.removeClass('currentActive');
				for (var i = 0; i < $scope.sideNavComp.length; i++) {
					$scope.sideNavComp[i] = false;
				}
				return false;
			} else {
				var $that = angular.element('.currentActive > a').parent();

				if ($that.is(':last-child')) {
					$that.parent().removeClass('nav-slide-active');
				}
				$that.removeClass('currentActive');
				for (var i = 0; i < $scope.sideNavComp.length; i++) {
					$scope.sideNavComp[i] = false;
				}

				$scope.sideNavComp[Number(angular.element(thisEvent.currentTarget).attr("idx"))] = true;
				if ($this.is(':last-child')) {
					$this.parent().addClass('nav-slide-active');
				}
				$this.addClass('currentActive');
				return false;
			}
		};

		$scope.onKeyDown = function (event) {
			if (event.which === 13) {
				$state.go('searchResult', {
					search: event.target.value
				});
			}
		};

		/* announcement popup */           
		$scope.announcement = {
			title: '',
			adding: false,
			urlState: false,
			urlRead: false,
			addState: function (item) {
				this.setCommon(item);
				this.setType(item);
				this.title = 'Add new ' + this.data.type + ' announcement';
				this.editing = this.viewing = false;
				this.adding = true;                
			},
			setType: function (item, index, dataSet) {
				if (this.data.type == "Smart") {
					this.urlState = true;
					this.urlRead = true;
					this.urlStateText = "https://gepmtstorage.blob.core.windows.net/smart2ux/workspace/index_launcher.html#";
				}
				else if (this.data.type == "External") {
					this.urlState = false;
					this.urlRead = false;
					this.urlStateText = "https://gepmtstorage.blob.core.windows.net/smart2ux/workspace/index_launcher.html#";
				}
			},
			editing: false,
			editState: function (item, index, dataSet) {
				this.setCommon(item, index, dataSet);
				this.setType(item, index, dataSet);
				this.title = 'Edit ' + this.data.type + ' announcement';
				this.adding = this.viewing = false;
				this.editing = true;               
			},
			viewing: false, 
			viewState: function (item, index, dataSet) {
				this.setCommon(item, index, dataSet);
				this.title = 'View ' + this.data.type + ' announcement';
				this.adding = this.editing = false;
				this.viewing = true;
			},
			forward: function () {
				if (this.dataSet[this.index + 1]) {
					this.data = this.clone(this.dataSet[this.index + 1]);
					this.index++;
				} else {
					this.data = this.clone(this.dataSet[0]);
					this.index = 0;
				}
			},
			backward: function () {
				if (this.dataSet[this.index - 1]) {
					this.data = this.clone(this.dataSet[this.index - 1]);
					this.index--;
				} else {
					this.data = this.clone(this.dataSet[this.dataSet.length - 1]);
					this.index = this.dataSet.length - 1;
				}
			},
			setCommon: function (item, index, dataSet) {
				this.index = index == undefined ? null : index
				this.dataSet = dataSet == undefined ? null : dataSet;
				this.data = this.clone(item);
				this.type = { title: this.data.type };
			},
			deleteAttach: function (index) {
				this.data.attachments.splice(index, 1);
			},
			clone: function (item) {
				//this.mainData = item;
				return angular.copy(item);
			},
			delete : function(){
				this.dataSet.splice(this.index, 1);
			},
			save : function(){
				//this.mainData = this.data;
				this.dataSet[this.index] = this.data;
			},
			index: null,
			data: null
		}
		/* announcement popup */        


		$scope.hideHeader = false;

		$rootScope.$on('hideheader',function (e, a) {
					$scope.hideHeader = a.condition;
			});
	};


 

})(angular);
