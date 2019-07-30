    (function() {
    	'use strict';        
    	angular.module('SMART2').directive('profilePic', ['notification',  function (notification) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        link: function (scope, element, attrs) {
            scope.isProfilePicEditable = false;
            scope.isUserProfile = false;
            if (attrs.circular == 'true') {
                scope.isUserProfile = true;
            }
            if (attrs.editable == 'true') {
                scope.isProfilePicEditable = true;
            }
            scope.dummyimg = false;
            if (attrs.dummyimg == 'true') {
                scope.dummyimg = true;
            }
           
            //var imgsrc = typeof attrs.imgsrc === 'undefined' ? 'shared/resources/images/dummyImage.jpg' : attrs.imgsrc;
            //var imgsrc = typeof attrs.imgsrc === 'undefined' ? scope.dummyimg = true : scope.dummyimg = false;
            //var dummySrc = typeof attrs.dummysrc === 'undefined' ? 'shared/resources/images/user_default_BIG.PNG' : attrs.dummysrc;
            //scope.dummyimg = typeof attrs.dummyimg === 'undefined' ? false : attrs.dummyimg;
            //scope.imgsrc = !JSON.parse(scope.dummyimg) ? imgsrc : dummyimg;
            //debugger;
            if (scope.isUserProfile == true) {
                if (!scope.dummyimg) {
                    scope.imgsrc = 'shared/resources/images/dummyImage.jpg';
                    //scope.imgsrc = !JSON.parse(scope.dummyimg) ? imgsrc : dummyimg;
                }
            }
            else {
                if (!scope.dummyimg) {
                    scope.imgsrc = 'shared/resources/images/kelloggs_logo.png';
                }
            }
            var readURL = function (input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        angular.element('.user-profile').addClass('is-profile-pic');
                        scope.dummyimg = false;
                        scope.imgsrc = e.target.result;
                        scope.$apply();
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }

            $("#callFileFOrProfile").on('change', function () {
               readURL(this);
            });

            scope.profilePicEdit = function () {
                document.getElementById("callFileFOrProfile").click();                
            }

            //var imgsrc = typeof attrs.imgsrc === 'undefined' ? 'shared/resources/images/dummyImage.jpg' : attrs.imgsrc;
            // var imgsrc = typeof attrs.imgsrc === 'undefined' ? scope.dummyimg = true : scope.dummyimg = false;
            //var dummySrc = typeof attrs.dummysrc === 'undefined' ? 'shared/resources/images/user_default_BIG.PNG' : attrs.dummysrc;
            //scope.dummyimg = typeof attrs.dummyimg === 'undefined' ? false : attrs.dummyimg;
            //scope.imgsrc = !JSON.parse(scope.dummyimg) ? imgsrc : dummyimg;
            // scope.isDeleted = false;

            scope.clearProfilePicEdit = function () {
            	var confi = {
            		type: "confirm",
            		message: "<p class='left-align'>Are you sure?</p>",
            		//checkMessage: "Do not show again.",
            		buttons: [
		    			{
		    				"title": "YES",
		    				"result": "yes"
		    			},
		    			{
		    				"title": "Cancel",
		    				"result": "no"
		    			}
            		]
            	};
            	notification.notify(confi, function (responce) {
            		if (responce.result == "yes") {
            			angular.element('.overL').prev().toggleClass('changeImage');
            			

            			//if (angular.element('.overL').prev().hasClass("changeImage") == true) {
            			//    scope.imgsrc = imgsrc;
            				
            			//	//scope.isDeleted = true;
            			//}
            			if (angular.element('.user-profile img').hasClass("changeImage")) {
            			    scope.imgsrc = false;
            			    scope.dummyimg = true;
            			    //scope.isDeleted = true;
            			    if (scope.isUserProfile == true) {            			       
            			        scope.imgsrc = 'shared/resources/images/user_default_BIG.PNG';
            			        angular.element('.user-profile').removeClass('is-profile-pic');
            			            //scope.imgsrc = !JSON.parse(scope.dummyimg) ? imgsrc : dummyimg;            			        
            			    }
            			}
            			else {
            				scope.imgsrc = dummySrc;
            				scope.isDeleted = false;
            				angular.element('.user-profile').addClass('is-profile-pic');
            				//console.log(isDeleted)
            			}
            		} else {
            			return;
            		}
            	});
            }
        },
        templateUrl: 'shared/components/directives/profilePic/profilePic.html'
    };
}]);
    })();