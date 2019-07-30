angular.module('SMART2').directive('smartSlider', ['$timeout', function ($timeout) {
	return{
		restrict: 'EA',
		scope: {},
			link: function (scope, element, attrs, event) {				
				//console.log(screenWidth);
				//scope.imgList = [];
				//for (i = 0; i < 6; i++) {
				//	scope.imgList.push({ thumbnail: "shared/theme/images/thumbnail-" + i + ".png", img: "shared/theme/images/main-image-" + i + ".png" });
				//	//scope.imgList.push({ thumbnail: "shared/theme/images/thumbnail-" + i + ".png", img: "shared/theme/images/main-image-" + i + ".png" });
				//	//alert("Hi");
				//}
				var halfShow = (attrs.halfshow == null || typeof (attrs.halfshow) === "undefined") ? false : (attrs.halfshow == "true") ? true : false;
				var elementSlid = element[0].querySelector("." + attrs.slidecontainer),
					screenWidth = elementSlid.offsetWidth || 1040,
					noOfSlides = parseInt(attrs.slidenumber, 10),
					remainingLI = parseInt(attrs.slidenumber, 10),
					staticStep = parseInt(attrs.steps, 10) || 1,
					noOfShiftedLI = parseInt(attrs.steps, 10) || 1;
					var liWidth = parseInt((screenWidth / noOfSlides), 10);
					if (halfShow) {
						liWidth = liWidth - ((liWidth / 2) / noOfSlides);
					}
					var setLeft       = 0,
					balanceLI; 
				//console.log(elementSlid, elementSlid.querySelector(".slider-nav-list").querySelector(".imageCarousel").offsetWidth, screenWidth)
				//elementSlid.querySelector(".slider-nav-list").querySelectorAll(".imageCarousel").style.width = liWidth;
				//var ulWidth = liWidth * scope.imgList.length + 61 + 'px';
				//scope.ulWidth = ulWidth;
				var listLength,
					listItem;
				$timeout(function () {
					listItem = elementSlid.querySelectorAll("." + attrs.slidecontainerlistitem);
					listLength = listItem.length;
					var i = 0;
					do {
						listItem[i].style.width = (liWidth - parseInt(attrs.space, 10)) + 'px';
						i++;
					
					}
					while (i < listLength);
				}, 10);
				var flagFire = false;

				var windowonresize = function () {
					if (flagFire !== false)
						clearTimeout(flagFire);
					flagFire = setTimeout(function () {
						screenWidth = elementSlid.offsetWidth || 1040;
						liWidth = parseInt((screenWidth / noOfSlides), 10);
						if (halfShow) {
							liWidth = liWidth - ((liWidth / 2) / noOfSlides);
						}
						noOfShiftedLI = parseInt(attrs.steps, 10) || 1;
						remainingLI = parseInt(attrs.slidenumber, 10);
						setLeft = 0;
						balanceLI
						var i = 0;
						do {
							listItem[i].style.width = (liWidth - parseInt(attrs.space, 10)) + 'px';
							i++;
						}
						while (i < listLength);
						angular.element(elementSlid).find('.' + attrs.slidecontainerlist).css('left', setLeft + "px");
						angular.element($rigthBtn).removeClass('arrow--disabled');
						angular.element($leftBtn).addClass('arrow--disabled');
					}, 200); //200 is time in miliseconds
				};

				angular.element(window).on('resize', windowonresize);

				scope.$on('$destroy', function () {
					angular.element(window).off('resize', windowonresize);
				});

				var $rigthBtn = element[0].querySelector("." + attrs.rightbtn),
					$leftBtn = element[0].querySelector("." + attrs.leftbtn);
				//scope.myStyle = { "width": ulWidth, "left":setLeft + "px",};
				$rigthBtn.onclick = function () {
					var $this = angular.element(this);
					balanceLI = listLength - remainingLI;
					noOfShiftedLI = staticStep === 1 ? noOfShiftedLI : balanceLI > 0 ? balanceLI < noOfShiftedLI ? balanceLI : noOfShiftedLI : 0;

					if (listLength > remainingLI) {
						setLeft = setLeft - (liWidth * noOfShiftedLI);
						angular.element(elementSlid).find('.' + attrs.slidecontainerlist).css('left', setLeft + "px");
						remainingLI = remainingLI + noOfShiftedLI;
					}

					if (listLength === remainingLI) {
						$this.addClass('arrow--disabled');
						noOfShiftedLI = staticStep;
					}
					angular.element($leftBtn).removeClass('arrow--disabled');
				};
				$leftBtn.onclick = function () {
					var $this = angular.element(this);
					balanceLI = remainingLI - noOfSlides;
					noOfShiftedLI = staticStep === 1 ? noOfShiftedLI : balanceLI > 0 ? balanceLI < noOfShiftedLI ? balanceLI : noOfShiftedLI : 0;

					if (remainingLI > noOfSlides) {
						setLeft = (liWidth * noOfShiftedLI) + setLeft;
						angular.element(elementSlid).find('.' + attrs.slidecontainerlist).css('left', setLeft + "px");
						remainingLI = remainingLI - noOfShiftedLI;
					}
					if (remainingLI <= noOfSlides) {
						$this.addClass('arrow--disabled');
						noOfShiftedLI = staticStep;
					}
					angular.element($rigthBtn).removeClass('arrow--disabled');
				};

				//scope.slideLeft = function (event) {
				//	var listLength = scope.imgList.length;
				//	balanceLI = listLength - remainingLI;
				//	noOfShiftedLI = staticStep === 1 ? noOfShiftedLI : balanceLI > 0 ? balanceLI < noOfShiftedLI ? balanceLI : noOfShiftedLI : 0;
				//	console.log(listLength, remainingLI, noOfShiftedLI, " remainingLI Left");

				//	if (listLength > remainingLI) {
				//		setLeft = setLeft - (liWidth * noOfShiftedLI);
				//		angular.element(event.target).closest('.imgHolder').find('.imgList').css('left', setLeft + "px");
				//		remainingLI = remainingLI + noOfShiftedLI;
				//	}

				//	if (listLength === remainingLI) {
				//		noOfShiftedLI = staticStep;
				//	}
				//}

				//scope.slideRight = function (event) {
				
				//	balanceLI = remainingLI - noOfSlides;
				//	noOfShiftedLI = staticStep === 1 ? noOfShiftedLI : balanceLI > 0 ? balanceLI < noOfShiftedLI ? balanceLI : noOfShiftedLI : 0;
				//	//console.log(scope.imgList.length, remainingLI, " remainingLI", noOfShiftedLI, " noOfShiftedLI", noOfSlides, " remainingLI Right")

				//	if (remainingLI > noOfSlides) {
				//		setLeft = (liWidth * noOfShiftedLI) + setLeft;
				//		angular.element(event.target).closest('.imgHolder').find('.imgList').css('left', setLeft + "px");
				//		remainingLI = remainingLI - noOfShiftedLI;
				//	}

				//	if (remainingLI <= noOfSlides) {
				//		noOfShiftedLI = staticStep;
				//	}

				//}

			}
			
			
		}
}]);