angular.module('SMART2')
.controller('p2pInvPOnumberPopupCtrl', ['$scope', 'notification', '$state', p2pInvPOnumberPopupCtrlFunc])
.controller('p2pPdfViewerCtrl', ['$scope', 'notification', '$sce', '$timeout', '$http', p2pPdfViewerCtrlFunc])
	/*.controller('p2pInvScannedCtrl', ['$scope',  'notification', '$sce', '$timeout','$http', '$state', '$filter', p2pInvScannedCtrlFunc])*/
/*.controller('itemDetailScannedInvCtrl',['$scope', '$state', 'notification',  '$translate', '$sce', itemDetailScannedInvCtrlFunc])*/
	
	;

function p2pInvScannedCtrlFunc($scope,  notification, $sce, $timeout,$http,$state, $filter) {

/*grid tab*/
  $scope.scannedTabData = [{
        "title" : "Lines",
        "contentUrl" : "p2p/inv/views/scannedLineTab.html"
   }, {
        "title" : "Basic Details",
        "contentUrl" : "p2p/inv/views/scannedBasicTab.html"
   }];
  $scope.scannedSelectedTab = {
        "title" : "Lines",
        "contentUrl" : "p2p/inv/views/scannedLineTab.html"
    };

   $scope.selectTab = function(index){
        $scope.scannedSelectedTab.title = $scope.scannedTabData[index].title;
        $scope.scannedSelectedTab.contentUrl = $scope.scannedTabData[index].contentUrl;
             $scope.$broadcast('showtab', { tab: $scope.scannedSelectedTab });
   }

  
/*grid tab end*/

  


/* tax popover */
    $scope.taxConfig =
        [
         {
            "dataName": "Invoice Value",
            "dataValue": 678.00,
            "taxEditable": true,
            "makeEdit": false
        },
        {
            "dataName": "Shipping",
            "dataValue": 109.00,
            "taxEditable": true,
            "makeEdit": false
        },
        {
            "dataName": "Taxes",
            "dataValue": 0,
            "taxEditable": false,
            "makeEdit": false
        }
        ,
        {
            "dataName": "Invoice Charges",
            "dataValue": 678,
            "taxEditable": false,
            "makeEdit": false
        }
        ];

    $scope.getTotalTax = function () {
        var count = 0;
        angular.forEach($scope.taxConfig, function (taxValue) {

            count += parseInt(taxValue.dataValue)

        });

        return count;

    };

    $scope.makeEditCurrent = function (elem) {
        $scope.taxConfig.forEach(function (element, index, array) {
            $scope.taxConfig[index].makeEdit = false;
            $scope.taxConfig[index].editableFieldFocus = false;
        });
        $scope.taxConfig[elem].makeEdit = true;
        $scope.taxConfig[elem].editableFieldFocus = true;
    };



    $scope.newTaxValue = $filter('number')("0", 2);


    $scope.updateTaxValue = function (index, data) {
        $scope.taxConfig[index].dataValue = $filter('number')(data, 2);
        $scope.newTaxValu = $filter('number')("0", 2);;
        $scope.taxConfig[index].makeEdit = false;
        $scope.taxConfig[index].focus = false;
    }

    $scope.cancelupdateTaxValue = function (index) {
        $scope.newTaxValu = $filter('number')("0", 2);
        $scope.taxConfig[index].makeEdit = false;
        $scope.taxConfig[index].focus = false;
    }

   $scope.showErrorAlert = false;
   $scope.gotToNextstep = false;
    $scope.submitInv = function (showErrorAlertValue, gotToNextstep) {
        if(!showErrorAlertValue && !gotToNextstep){
            $scope.showErrorAlert = !showErrorAlertValue;
            $scope.gotToNextstep = false;
        }

        else{
            
        var confi_2 = {
                    type: "success",
                    message: "<p class='left-align'>Invoice created successfully.</br> Would you like to create another Invoice? </p> ",
                    buttons: [
                    {
                        "title": "YES",
                        "result": "yes"
                    },
                    {
                        "title": "NO, THANKS",
                        "result": "no"
                    }
                    ]
        };

         notification.notify(confi_2, function (response) {
            
                if (response.result == 'yes') {
                        $state.go('expandedLandingList', { doctype: 'scannedInvoice' });

                }else if(response.result == 'no'){

                    $state.go('expandedLandingList', { doctype: 'invoice' });

                }

                });

        }
	
    }
/*scanned invoice */
	$scope.docURL = 'shared/resources/images/TATA invoice.pdf';
    $scope.pdfScale = 1.6;
    $scope.instance = pdf.Instance("viewer");
    $scope.nextPage = function() {
        $scope.instance.nextPage();
    };

    $scope.prevPage = function() {
        $scope.instance.prevPage();
    };
    $scope.ZoomIn = function(scale) {
        $scope.pdfScale = parseFloat(scale) + 0.2;
    };
    $scope.ZoomOut = function(scale) {
        $scope.pdfScale =  parseFloat(scale) - 0.2;
    };
    $scope.zoomReset = function(scale){
        $scope.pdfScale = 1.6;
    };
        $scope.rotateLeft = function(currentRotated){
                 $scope.instance.rotateLeft();

        };
        $scope.rotateRight = function(currentRotated){
                $scope.instance.rotateRight();

        };


    $scope.pageLoaded = function(curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };

    $scope.loadProgress = function(loaded, total, state) {
      
    };
	$scope.ScannedInvoiceImg = true;
  	$scope.openPDFinPopup = function(ScannedInvoiceImg){
  		if(ScannedInvoiceImg == true){
  			newwindow=window.open('index_launcher.html#/p2p/inv/pdfViewer','name','height=675,width=643');
  			newwindow
  		}
		$scope.ScannedInvoiceImg = !$scope.ScannedInvoiceImg;
			
  	}




	$scope.warning = function (item) {
        var config = {
            type: "warning",
            message: "All unsaved changes in current invoice will be lost.<br/> Proceeding will create new Invoice with chosen Image.<br/> Do you want to continue?",
            buttons: [
                {
                    "title": "YES",
                    "result": "yes"
                },
                {
                    "title": "NO",
                    "result": "no"
                }]
        };
        notification.notify(config, function (result) {
            if (result.result == "yes") {
              //  item.idnoLookup = false;
               // item.isFocus = true;
            }
            else {
               // item.idnoLookup = true;
              //  item.isFocus = false;
            }
        });
    }

    $scope.scannnedImagesList = [{
    	"title": "Outbound From SAP",
    	"imageName": "IMG2016 - 000182",
    	"imageUploadedBy": "Masco Admin",
    	"imageUploadedDate": "2015-04-01",
		"imageUrl":""
    },
    {
    	"title": "Outbound From SAP1",
    	"imageName": "IMG2016 - 000182",
    	"imageUploadedBy": "Masco Admin",
    	"imageUploadedDate": "2015-04-01",
    	"imageUrl": ""
    },
    {
    	"title": "Outbound From SAP2",
    	"imageName": "IMG2016 - 000182",
    	"imageUploadedBy": "Masco Admin",
    	"imageUploadedDate": "2015-04-01",
    	"imageUrl": ""
    },
    {
    	"title": "Outbound From SAP3",
    	"imageName": "IMG2016 - 000182",
    	"imageUploadedBy": "Masco Admin",
    	"imageUploadedDate": "2015-04-01",
    	"imageUrl": ""
    }]

	

    // Start: Preview document popup
    $scope.previewDocumentFlag = false;
    $scope.showDocumentPreview = function (index) {
        $scope.previewDocumentFlag = true;
        $scope.slideObj = {
        	list: $scope.scannnedImagesList,
            index: index,
            src: 'p2p/inv/views/templateInvoiceScreenshot.html'
        };
    };
    $scope.closeDocumentPreviewPopup = function () {
        $scope.previewDocumentFlag = false;
    };
    // End: Preview document popup

	/* ZOOM FUNCTIONALITY STARTS */
	$scope.currentZoom = 100; //original size of content

	$scope.zoomObj = true; // default zoom in active

	//onclick of zoom in icon
	$scope.zoomIn = function () { 
		$scope.zoomObj = true;
	}
	//onclick of zoom out icon
	$scope.zoomOut = function () {
		$scope.zoomObj = false;
		console.log($scope.zoomObj);
	}
	/* ZOOM FUNCTIONALITY ENDS */

	$scope.closeSlideView = function () {
		angular.element('body').css('overflow', '');
		$scope.openSlideModal = '';
		$scope.openPopuFlag = false;
	}

	$scope.selectedImage = function (current) {
		$scope.$emit('showImages', { showTemp: current });
	}

	$scope.getTemplateIndex = function (index) {
		var checkindex = index + 1;
		if (checkindex == 1) {
			return $scope.slideDataIndexTemp.first
		}
		else if (checkindex == 2) {
			return $scope.slideDataIndexTemp.second
		}
		else if (checkindex == 3) {
			return $scope.slideDataIndexTemp.third
		}
	}

	/*slider*/
	$scope.openPopuFlag = false;
	$scope.tempPreview = '',
    $scope.tempCurrent = '',
        $scope.tempNext = '';

	$scope.$on('showImages', function (event, args) {
		var getValuefromChild = args.showTemp;
		if (0 > getValuefromChild) {
			return false;
		} else {
			$scope.opentempPopup(getValuefromChild);
		}
	});

	$scope.opentempPopup = function (current) {
		$scope.openPopuFlag = true;
		$scope.tempPreview = current - 1,
        $scope.tempCurrent = current,
         $scope.tempNext = current + 1;

		$scope.previewFlag = true;
		$scope.openSlideModal = 'slide-view-modal--open';

		$scope.slideDataIndex = $scope.tempCurrent || 0;
		$scope.slideDataIndexTemp = {
			'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
			'second': $scope.slideDataIndex,
			'third': $scope.slideDataIndex + 1
		}
	}

	$scope.info = $scope.scannnedImagesList;
	$scope.slideHide1 = false;
	$scope.slideHide2 = false;
	$scope.slideHide3 = false;

	$scope.slide1 = 'slide-prev';
	$scope.slide2 = 'slide-current';
	$scope.slide3 = 'slide-next';

	$scope.slideDataIndex = $scope.tempCurrent || 0;
	$scope.slideDataIndexTemp = {
		'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
		'second': $scope.slideDataIndex,
		'third': $scope.slideDataIndex + 1
	}
	$scope.getIndexforContent = function (index) {
		switch (index) {
			case '0':
				return slideDataIndexTemp.first;
				break;
			case '1':
				return slideDataIndexTemp.second;
				break;
			case '2':
				return slideDateIndexTemp.third;
		}

	}

	var hideCall = function () {
		if ($scope.slide1 == 'slide-prev' || $scope.slide1 == 'slide-next') {
			$scope.slideHide1 = true;
		} else { $scope.slideHide1 = false; }

		if ($scope.slide2 == 'slide-prev' || $scope.slide2 == 'slide-next') {
			$scope.slideHide2 = true;
		} else { $scope.slideHide2 = false; }

		if ($scope.slide3 == 'slide-prev' || $scope.slide3 == 'slide-next') {
			$scope.slideHide3 = true;
		} else { $scope.slideHide3 = false; }
	};
	hideCall();
	var setCurrentTitle = function () {
		$timeout(function () {
			// $scope.selectedDoc = { title: ($scope.info[$scope.slideDataIndex].title) };
		}, 500);

	};

	$scope.next = function () {

		if ($scope.slideDataIndex == ($scope.info.length - 1)) {
			return;
		}
		$scope.slideDataIndex = $scope.slideDataIndex + 1;
		// $scope.nextSlideTitle = $scope.info[$scope.slideDataIndex].title;
		$scope.selectedItems = '0';

		if (($scope.slide1 == 'slide-prev')) {
			$scope.slide1 = 'slide-next';
		} else if ($scope.slide1 == 'slide-current') {
			$scope.slide1 = 'slide-prev';
		} else {
			$scope.slide1 = 'slide-current';
			$scope.slideDataIndexTemp = {
				'first': $scope.slideDataIndex,
				'second': $scope.slideDataIndex + 1,
				'third': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1)
			}


			setCurrentTitle();
		}
		if (($scope.slide2 == 'slide-prev')) {
			$scope.slide2 = 'slide-next';
		}
		else if ($scope.slide2 == 'slide-current') {
			$scope.slide2 = 'slide-prev';
		} else {
			$scope.slide2 = 'slide-current';
			$scope.slideDataIndexTemp = {
				'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
				'second': $scope.slideDataIndex,
				'third': $scope.slideDataIndex + 1
			}
			setCurrentTitle();
		}
		if (($scope.slide3 == 'slide-prev')) {
			$scope.slide3 = 'slide-next';
		}
		else if ($scope.slide3 == 'slide-current') {
			$scope.slide3 = 'slide-prev';
		}
		else {
			$scope.slide3 = 'slide-current';
			$scope.slideDataIndexTemp = {
				'first': $scope.slideDataIndex + 1,
				'second': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
				'third': $scope.slideDataIndex
			}
			setCurrentTitle();
		}
		hideCall();
		$scope.getSlideDataIndexFirst = $scope.slideDataIndexTemp.first;
		$scope.getSlideDataIndexSecond = $scope.slideDataIndexTemp.second;
		$scope.getSlideDataIndexThird = $scope.slideDataIndexTemp.third;
	};
	$scope.prev = function () {
		$scope.selectedItems = '0';
		if ($scope.slideDataIndex == 0) {
			return;
		}
		$scope.slideDataIndex = $scope.slideDataIndex - 1;
		//$scope.prevSlideTitle = $scope.info[$scope.slideDataIndex].title;
		if (($scope.slide1 == 'slide-prev')) {

			$scope.slide1 = 'slide-current';
			$scope.slideDataIndexTemp = {
				'first': $scope.slideDataIndex,
				'second': $scope.slideDataIndex + 1,
				'third': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1)
			}
			setCurrentTitle();
		} else if ($scope.slide1 == 'slide-current') {
			$scope.slide1 = 'slide-next';
		} else {
			$scope.slide1 = 'slide-prev';
		}
		if (($scope.slide2 == 'slide-prev')) {

			$scope.slide2 = 'slide-current';
			$scope.slideDataIndexTemp = {
				'first': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
				'second': $scope.slideDataIndex,
				'third': $scope.slideDataIndex + 1
			}
			setCurrentTitle();
		} else if ($scope.slide2 == 'slide-current') {
			$scope.slide2 = 'slide-next';
		} else {
			$scope.slide2 = 'slide-prev';
		}
		if (($scope.slide3 == 'slide-prev')) {

			$scope.slide3 = 'slide-current';
			$scope.slideDataIndexTemp = {
				'first': $scope.slideDataIndex + 1,
				'second': ($scope.slideDataIndex - 1) < 0 ? 0 : ($scope.slideDataIndex - 1),
				'third': $scope.slideDataIndex
			}
			setCurrentTitle();
		} else if ($scope.slide3 == 'slide-current') {
			$scope.slide3 = 'slide-next';
		} else {
			$scope.slide3 = 'slide-prev';
		}
		hideCall();
		$scope.getSlideDataIndexFirst = $scope.slideDataIndexTemp.first;
		$scope.getSlideDataIndexSecond = $scope.slideDataIndexTemp.second;
		$scope.getSlideDataIndexThird = $scope.slideDataIndexTemp.third;
	};
	//Slider ends


	$scope.isTemplateSelected = [];
	$scope.templateLists =
        [{ 'title': 'TEMPLATE 1', 'isChecked': false },
            { 'title': 'TEMPLATE 2', 'isChecked': false },
            { 'title': 'TEMPLATE 3', 'isChecked': false }
        ];




	

   


       var scanInvResponse = {
       	method: 'GET',
       	url: "p2p/inv/models/scannedInv.json"
       };


       $http(scanInvResponse).then(function (response) {
  
       	$scope.doclists = response.data.datalist;
       
       
       }, function (error) {
       	console.log(JSON.stringify(error));
       });




};

function p2pInvPOnumberPopupCtrlFunc($scope, notification, $state) {
    $scope.nextDisabled = true;
    $scope.supplierAttributes = {
            isDisabled: true,
            isValidate: false,
            isMandatory: true

        }
        // RADIO BUTTON SECTION
    $scope.poNumberDetailsType = {
        "option": [{
            "code": "yes",
            "name": "Yes, use following details"
        }]
        ,
        "option1": [{
            "code": "no",
        "name": "No, Proceed without PO Number"
        }
        ],
        "selected":{ "code": "yes", "name": "Yes, use following details" }
    };


    // RADIO BUTTON SECTION END
    // AUTO SUGGEST


    $scope.options = [{
        "orderId": 28360,
        "OrderNumber": "PO-80.1004876",
        "supplier": "McMaster"
    }, {
        "orderId": 28977,
        "OrderNumber": "PO-80.1004884",
        "supplier": "McMaster Inc."
    }, {
        "orderId": 57950,
        "OrderNumber": "PO-80.1004891",
        "supplier": "Star Supplies"
    }];

    $scope.onOrderNumberSelect = function(data) {

        if (data) {
            $scope.nextDisabled = false;
        } else {

            $scope.nextDisabled = true;
        }
    };

    $scope.updateOrderNumber = function(e) {
        if (e.target.value.length <= 0) {
            $scope.poNumberDetails.poDetail.orderId = ""
            $scope.poNumberDetails.poDetail.OrderNumber = ""
            $scope.poNumberDetails.poDetail.supplier = ""
        }

    }
    $scope.PoNumberConfClose = function() {
        $scope.$emit('model.close', { model: false });
        

    }
    $scope.PoNumberConfOpen = function(data) {
        $scope.$emit('model.close', { model: true });
        $scope.onOrderNumberSelect(data)
    }

    $scope.rulesforFields = {
        "orderNumber": [{
            "rule": "this.length <= 0  ",
            "error": "This field should not be empty"
        }]
    };




    $scope.validatePoFields = {
        validatePoNumber: false,
        validateSupName: false
    }

    // AUTO SUGGEST END
    // SUPPLIER SELECT
    /*
    $scope.supplierOptions = [{
               "supplierName": ""
          }, {
              "supplierName": "McMaster Inc."
          }, {
              "supplierName": "Star Supplies"
          }];
          $scope.selectedSupplier = {  "supplierName": "" };
          $scope.supplierOnChange = function(selectedSupplier) {
                            $scope.nextDisabled = false;
           };
     

    */
    $scope.onPoDetailsChange = function(currentValue) {
        if (currentValue.code == 'no') {

            $scope.nextDisabled = false;
        } else {
            $scope.nextDisabled = true;
        }

    };
    $scope.poNumberDetails = {
        "poDetail": "",

        "supplierInvoicesNumber": "",
        "invoiceDate": ""
    }
    $scope.withoutPoNumberDetails = {
        "supplierInvoicesNumber": "",
        "invoiceDate": ""
    }

 

    $scope.gotToInvoice = function(values, nextDisabled) {
        if (nextDisabled == false) {
            $scope.$emit('model.close', { model: false, goToNext: true });

            if (values.code == "yes") {
                $state.go('p2p.inv.nonpoinv', { scannedDoc: true });
                $scope.$emit('hideheader', { condition: false });
            } else {
                $state.go('p2p.inv.nonpoinv');
                $scope.$emit('hideheader', { condition: false });
            }

            
        }
    }

    $scope.cancelCurrentInfo = function() {
        $scope.$emit('model.close', { model: false, goToNext: false });
        $scope.poNumberDetails.poDetail.orderId = "";
        $scope.poNumberDetails.poDetail.OrderNumber = "";
        $scope.poNumberDetails.supplierName = "";
        $scope.poNumberDetails.supplierInvoicesNumber = "";
        $scope.poNumberDetails.invoiceDate = "";
        $scope.withoutPoNumberDetails.supplierInvoicesNumber = "";
        $scope.withoutPoNumberDetails.invoiceDate = "";
        $scope.poNumberDetailsType.selected = { "code": "yes", "name": "Yes, use following details" };

    }


};



function itemDetailScannedInvCtrlFunc($scope, $state, $notification, $translate, $sce ){


 $scope.selectedTab = {
        "title" : "Lines",
        "contentUrl" : "p2p/inv/views/scannedLineTab.html"
   };
 
$scope.$on('showtab', function (event, args) {
      $scope.selectedTab.title = args.tab.title;
        $scope.selectedTab.contentUrl = args.tab.contentUrl;
 });

 

   $scope.showErrorAlertFunc = function(showErrorAlert, gotToNextstep){


            $scope.$parent.showErrorAlert = !showErrorAlert;
            $scope.$parent.gotToNextstep = !gotToNextstep;
   }; 





 // popup -- search
    $scope.focusSearch = false;
    $scope.isActive = false;
    $scope.showMe = false;
    $scope.showSearch = function () {
        $scope.isActive = true;
        $scope.focusSearch = true;
        $scope.showMe = true;
        $scope.hideClose = true;
    };

    $scope.hideSearch = function () {
        $scope.isActive = false;
        $scope.focusSearch = false;
        $scope.hideClose = false;
    };

    //select All -- add lines from -- requisition tab
    $scope.checkAll = function (aug) {
        angular.forEach($scope.importFromReq, function (importFromReq, key) {
            $scope.importFromReq[key].selected = aug;
        });
    };

    //select All -- add lines from -- template tab
    $scope.checkAllTemp = function (aug) {
        angular.forEach($scope.importFromTemp, function (importFromTemp, key) {
            $scope.importFromTemp[key].selected = aug;
        });
    };


    $scope.itemDetailPOTabDataset = [
		{ "title": "Lines", "contentUrl": "p2p/order/views/itemDetailMatLinesTab.html", "active": true },
        { "title": "Charges And Allowances", "contentUrl": "p2p/order/views/chargesAndAllowances.html", },
		{ "title": "Accounting", "contentUrl": "p2p/order/views/itemDetailMatAccTab.html" },
        { "title": "Notes and Attachments", "contentUrl": "p2p/order/views/itemDetail-notes-attachments.html" }
    ];

    $scope.flexibleDetailPOTabDataset = [
		{ "title": "Charges", "contentUrl": "p2p/order/views/chargesandAllowChargesTab.html", "active": true },
		{ "title": "Accounting", "contentUrl": "p2p/order/views/chargesandAllowAccTab.html" },
    ];

    $scope.importLineItemsTabDataset = [
		{ "title": "Requisition", "contentUrl": "p2p/order/views/importLineItemsReqTab.html", "active": true },
		{ "title": "Templates", "contentUrl": "p2p/order/views/importLineItemsTemplTab.html" }
    ];


    $scope.spExternalLinks = ['3 S&Ps', '2 S&Ps', '5 S&PS', '6 S&PS', '4 S&PS'];

    $scope.getspLink = function (rowIndex) {
    		
    		return $scope.spExternalLinks[rowIndex];
    	}



    //import from requisition
   
    $scope.importFromReq = [
        {
            "Name": "Payment Term",
            "Number": "REQ-2016.000313",
            "showFlag": true,
            "isSelected": false,
            "countItem": "10",
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]
        },
        {
            "Name": "Legal Entity",
            "Number": "REQ-2016.000313",
            "countItem": "10",
            "showFlag": false,
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            }
            ]
        },
        {
            "Name": "shipping & freight",
            "Number": "REQ-2016.000313",
            "countItem": "10",
            "showFlag": true,
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Services",
                "isChecked": true
            },
            {
                "itemName": "IT Laptop and Service Maintenance",
                "quantity": "100 Hours",
                "itemNumber": "PC-2015.000063",
                "supplierName": "CAP Supplier 1",
                "category": "IT Telecom",
                "type": "Material",
                "isChecked": true
            }
            ]

        }
    ];
 
    $scope.importFromTemp = [
        {
            "Name": "Payment Term Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]
        },
        {
            "Name": "Legal Entity Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]
        },
        {
            "Name": "Shipping & freight Template",
            "Number": "TEMP-2016.000313",
            "countItem": "10",
            "isSelected": false,
            "createdBy": "Masco Admin",
            "createdOn": "2015-04-01",
            "summary": "Morbi tortor metus, volutpat ut augue non, scelerisque euismod erat. Curabitur ut nunc eleifend",
            "isTempSelected": false,
            "isCheckedAll": true,
            "tempAttr": [
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Services",
                  "isChecked": true
              },
              {
                  "itemName": "IT Laptop and Service Maintenance",
                  "quantity": "100 Hours",
                  "itemNumber": "PC-2015.000063",
                  "supplierName": "CAP Supplier 1",
                  "category": "IT Telecom",
                  "type": "Material",
                  "isChecked": true
              }
            ]

        }
    ];


    $scope.selectedTemplateData = [];
    //$scope.showReqTempCall = function (index) {
    //    $scope.selectedTemplateData = [];
    //    $scope.showReqTemp = true;
    //    $scope.slideObj = {
    //        list: $scope.selectedTemplateData,
    //        index: index,
    //        src: 'p2p/req/views/reqTemplatePopupContent.html'
    //    };
    //};
    //$scope.closeReqTempPopup = function () {
    //    $scope.showReqTemp = false;
    //}
    var currentTempList = $scope.importFromReq;
    $scope.tabChangeCall = function (obj) {
        if (obj.id == 1) {
            currentTempList = $scope.importFromReq;
        } else {
            currentTempList = $scope.importFromTemp;
        }
    }
    $scope.reqTemplateNextCall = function () {
        $scope.reqTempCount = 0;
        $scope.selectedTemplateData = [];      
        for (var i = 0; i < currentTempList.length; i++) {
            if (currentTempList[i].isSelected == true) {
                $scope.selectedTemplateData.push(currentTempList[i]);
            }
        }       
        if ($scope.selectedTemplateData.length > 0) {           
                $scope.addLinesFormPopUp = false;
                $scope.showReqTempCall();           
                     
        }       
    }
    $scope.showReqTemp = false;
    $scope.showReqTempCall = function () {
        $scope.showReqTemp = true;
        $scope.currentTemplateData = $scope.selectedTemplateData[0];
    }
    $scope.hideReqTempCallback = function (e) {
        $scope.showReqTemp = false;
    }
    $scope.reqTempCount = 0;    
    $scope.prevReqTemp = function () {        
        $scope.currentTemplateData = [];
        if ($scope.reqTempCount > 0) {
            $scope.reqTempCount--;
        }
        $scope.currentTemplateData = $scope.selectedTemplateData[$scope.reqTempCount];
    }
    $scope.nextReqTemp = function () {
        $scope.currentTemplateData = [];
        if ($scope.reqTempCount < $scope.selectedTemplateData.length) {
            $scope.reqTempCount++;
        }
        $scope.currentTemplateData = $scope.selectedTemplateData[$scope.reqTempCount];
    }
    $scope.selectAllTemple = function (selectedTemplateallitem) {        
        var tempAttr = $scope.currentTemplateData.tempAttr;
        if (selectedTemplateallitem.isCheckedAll != true) {
            $scope.selectedItems = 0;
            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = false;
            }
        } else {
            $scope.selectedItems = tempAttr.length;
            for (var i = 0; i < tempAttr.length; i++) {
                tempAttr[i].isChecked = true;
            }
        }

    };
    $scope.selectedItems = 6;
    $scope.addItem = function (elem, index) {
        var selectedItemCount = 0;
        if (elem == true) {
            $scope.selectedItems = ($scope.selectedItems + 1);
        } else {           
            $scope.selectedItems = ($scope.selectedItems - 1);
        }
        if ($scope.selectedItems == $scope.currentTemplateData.tempAttr.length) {
            $scope.currentTemplateData.isCheckedAll = true;
        } else
            $scope.currentTemplateData.isCheckedAll = false;
    };

    $scope.fields = [];
    $scope.accfields = [];

    //line -- manage columns
    $scope.manageColumns = function () {
        $scope.fields = [];
        $scope.fields = [
        { 'lable': 'Requested Date' },
        { 'lable': 'Shipping Method' },
        { 'lable': 'Procurement Option' },
        { 'lable': 'Inventory Type' },
        { 'lable': 'Matching' },
        { 'lable': 'Supplier Code' },
        { 'lable': 'Supplier Contact' },
        { 'lable': 'Manufacturer Name' },
        { 'lable': 'Manufacturer P...' },
        { 'lable': 'Contract Name' },
        { 'lable': 'Contract Expiry Date' },
        { 'lable': 'Contract Value' },
        { 'lable': 'Payment Terms' },
        ];


        $scope.noOfCol = parseInt(Math.round($scope.fields.length / 5));
        $scope.colWidth = 200;
        $scope.listHolderWidth = { 'width': $scope.noOfCol * $scope.colWidth + "px" }
        $scope.startVal = 0;


        $scope.getStartFrom = function () {
            $scope.startVal += 1;
        };

        $scope.cloneDiv = function (n) {
            return new Array(n);
        };

        $scope.itemsLimit = 5;
        $scope.itemsColumnized = function (myIndex) {
            var currentPageIndex = myIndex * $scope.itemsLimit;
            return $scope.fields.slice(currentPageIndex, currentPageIndex + $scope.itemsLimit);
        };


    }

	//line -- manage columns -- check all
    $scope.selectedAll = { 'selection': false }, $scope.splitsSelectedAll = { 'selection': false }, $scope.fillpartial = false, $scope.isVisible = false;
    $scope.checkAll = function (aug) {
        angular.forEach($scope.fields, function (field, key) {
            $scope.fields[key].selected = aug;
        });
        if (aug === true) {
            $scope.isVisible = true;
            $scope.fillpartial = false;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
        }
        $scope.selectedCount = getSelectedCout($scope.fields);
    };

    //line -- manage columns -- reset
    $scope.reset = function () {
        $scope.selectedAll.selection = false;
        $scope.fillpartial = false;
        $scope.isVisible = false;
        $scope.checkAll(false);
        $scope.selectedCount = getSelectedCout($scope.fields);

    };

    //line -- manage columns -- on change in list checkboxes
    $scope.onChange = function (obj) {
        if (isAtleastOneSelected($scope.fields)) {
            $scope.isVisible = true;
            $scope.fillpartial = true;
        } else {
            $scope.isVisible = false;
            $scope.fillpartial = false;
            $scope.selectedAll.selection = false;
        }
        if (isAllSelected($scope.fields)) {
            $scope.fillpartial = false;
            $scope.selectedAll.selection = true;
        }
        $scope.selectedCount = getSelectedCout($scope.fields);
    }

    //line -- manage columns -- global fn for get count
    function getSelectedCout(obj) {
        var count = 0;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected === true) {
                count++;
            }
        }
        return count;
    }
    $scope.selectedCount = getSelectedCout($scope.fields);

    //line -- manage columns -- global fn for at least on checkbox selection in list
    function isAtleastOneSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected === true) {
                return true;
            }
        }
        return false;
    }

    //line -- manage columns -- global fn for all checkboxes selection
    function isAllSelected(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (!obj[i].selected) {
                return false;
            }
        }
        return true;
    }

    //accounting details -- manage columns
    $scope.accManageColumns = function () {
        $scope.accfields = [];
        $scope.accfields = [
        { 'lable': 'UOM' },
        { 'lable': 'Split Taxes & Charges (USD)' },
        { 'lable': 'Requester' }
        ];
    }

    //localization label - normal label, config labels
    $scope.labels = {
        supplierLable: $translate.instant("Supplier"),
        shippingLable: $translate.instant("Shipping"),
        accountingLable: $translate.instant("Accounting"),
        addDetailsLable: $translate.instant("Additional Details")
    };

    //localization label - buttons
    $scope.cancelBtnConfig = { title: $translate.instant("CANCEL") };
    $scope.resetBtnConfig = { title: $translate.instant("RESET") };
    $scope.selectItemsBtnConfig = { title: $translate.instant("SELECT ITEMS") };
    $scope.doneBtnConfig = { title: $translate.instant("DONE") };
    $scope.backBtnConfig = { title: $translate.instant("BACK") };
    $scope.ApplyBtnConfig = { title: $translate.instant("APPLY") };

    // POPUP -- apply to all 
    $scope.applyToAllUrl = "shared/popup/views/popupLinesBulkEdit.html";

    $scope.applyToAllPopUp = false;
    $scope.applyToAllPopUpCallback = function (e) {
        $scope.applyToAllPopUp = true;
    };
    $scope.applyToAllPopUpClose = function (e) {
        $scope.applyToAllPopUp = false;
    };


    $scope.addLinesFormUrl = "p2p/order/views/popupAddLinesForm.html";

    $scope.addLinesFormPopUp = false;
    $scope.addLinesFormPopUpCallback = function (e) {
        $scope.addLinesFormPopUp = true;
    };
    $scope.addLinesFormPopUpClose = function (e) {
        $scope.addLinesFormPopUp = false;
    };

    // popup -- apply to all -- sidebar links
    $scope.iteams = [
	{ title: $scope.labels.supplierLable, lable: 'supplier', isChecked: false },
	{ title: $scope.labels.shippingLable, lable: 'shipping', isChecked: false },
	{ title: $scope.labels.accountingLable, lable: 'accounting', isChecked: false },
    { title: $scope.labels.addDetailsLable, lable: 'additionalDetails', isChecked: false }
    ];

    // popup -- apply to all -- vertical tabs
    $scope.tab = 0;
    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    // popup -- apply to all -- lables
    $scope.suppName = "CTPG OPERATING LLC";
    $scope.suppCode = "CTPG-2014.000000";
    $scope.shipto = "CTPG-2014.000000";
    $scope.address = "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, India, 400708.";
    $scope.deliverTo = "Airoli Station, Thane - Belapur Road, Mind Space, Navi Mumbai, India, 400708.";
    $scope.requester = "John Doe";
    $scope.bu = "101 - GEP, New Jersey";
    $scope.costCenter = "1011 - OutSourcing";
    $scope.glCode = "2034 - Generral Service";
    $scope.projectCode = "2034040 - Project Code";
    $scope.contractNo = "20380 - IT/Hardware";
    $scope.date = "2016-12-27T14:08:43.543Z";
    $scope.suppContact = "+1-541-854-1010";
    $scope.costCenter = "A";
    $scope.accountNumber = "07-20-2016";
    $scope.projectId = "39099-21-25";

    // popup -- apply to all -- checkbox Selection interaction
    $scope.isChecked = {};

    // popup -- apply to all -- select item
    $scope.applyToAllSplitsUrl = "shared/popup/views/popupSplitsBulkEdit.html";

    $scope.applyToAllSplitsPopUp = false;
    $scope.applyToAllSplitsPopUpCallback = function (e) {
    	$scope.applyToAllSplitsPopUp = true;
    };
    $scope.applyToAllSplitsPopUpClose = function (e) {
    	$scope.applyToAllSplitsPopUp = false;
    };

    // popup -- apply to all -- select item -- item list
    $scope.itemList = [{ 'lable': 'Description 1' }, { 'lable': 'Description 2' }, { 'lable': 'Description 3' }, { 'lable': 'Description 4' }, { 'lable': 'Description 5' }, { 'lable': 'Description 6' }, { 'lable': 'Description 7' }, { 'lable': 'Description 8' }, { 'lable': 'Description 9' }, { 'lable': 'Description 10' }];

    $scope.spiltsItemList = [{ 'lable': 'Description 1 - Split 1 ' }, { 'lable': 'Description 2 - Split 2' }, { 'lable': 'Description 3 - Split 3' }, { 'lable': 'Description 4 - Split 4' }, { 'lable': 'Description 5 - Split 5' }, { 'lable': 'Description 6 - Split 6' }, { 'lable': 'Description 7 - Split 7' }, { 'lable': 'Description 8 - Split 8' }, { 'lable': 'Description 9 - Split 9' }, { 'lable': 'Description 10 - Split 10' }];

    //popup -- apply to all-select items -- select All
    $scope.checkAllC = function (aug) {
        angular.forEach($scope.itemList, function (itemList, key) {
        	$scope.itemList[key].selected = aug;
        });
    };

    $scope.checkAllSplits = function (aug) {
    	angular.forEach($scope.spiltsItemList, function (itemList, key) {
    		$scope.spiltsItemList[key].selected = aug;
    	});
    };

    $scope.addLines = 1;


    // popup -- manufacturer details -- select item -- item list
    $scope.manufatureDetails = "shared/popup/views/popupManufacturerDetails.html";
    $scope.manufatureDetailsPopup = false;
    $scope.manufatureDetailsCallback = function (e) {
        $scope.manufatureDetailsPopup = true;
    };
    $scope.manufatureDetailsPopupHideCallback = function (e) {
        $scope.manufatureDetailsPopup = false;
    };

    // popup -- Add Info
    $scope.AddChargesinfo = "shared/popup/views/popupEditStandardAndProcedure.html";
    $scope.AddChargesinfoPopup = false;
    $scope.AddChargesinfoCallback = function (e) {
        $scope.AddChargesinfoPopup = true;
    };
    $scope.AddChargesinfoPopupHideCallback = function (e) {
        $scope.AddChargesinfoPopup = false;
    };


    // popup -- Add Info
    $scope.AddChargesAttach = "shared/popup/views/popupEditStandardAttacment.html";
    $scope.AddChargesAttachPopup = false;
    $scope.AddChargesAttachCallback = function (e) {
        $scope.AddChargesAttachPopup = true;
    };
    $scope.AddChargesAttachPopupHideCallback = function (e) {
        $scope.AddChargesAttachPopup = false;
    };

    // UI Grid -- popup callback 
    $scope.callbackFucn = function (obj, def) { //obj is 'sring' & def is 'column & row' as defined in directive

        // UI Grid -- popup callback -- taxes papup
        if (def.col &&  def.col.field == 'taxes') {
            $scope.showTaxesPopup = true;
        }
        // UI Grid -- popup callback -- manufacturer details papup
        if (def.col && def.col.field == 'manufacturerDetails') {
         
            $scope.manufatureDetailsPopup = true;
        }

        if (def.col && def.col.field == 'AddInfo') {
           
            $scope.AddChargesinfoPopup = true;
            $scope.forEditColumnObj = def;
            if (def.row.entity.AddInfo != def.col.colDef.attributes.defaultTitle) {
                $scope.addInfoPopupText = def.row.entity.AddInfo;
            } else {
                $scope.addInfoPopupText = "";
            }
        }

        if (def.col && def.col.field == 'AddInfoAttach') {
          
            $scope.AddChargesAttachPopup = true;
            $scope.forEditColumnObj = def;
            if (def.row.entity.AddInfoAttach != def.col.colDef.attributes.defaultTitle) {
                $scope.AddInfoAttachPopupText = def.row.entity.AddInfoAttach;
            } else {
                $scope.AddInfoAttachPopupText = "";
            }
            
        }

        // UI Grid -- popup callback -- S&P
        if (def.col && def.col.field == 'spLink' && def.row.entity.spLink == 'ADD S&P') {
            $scope.showSPPopup = true;
        }
        else if (def.col && def.col.field == 'spLink') {
            $scope.showGridSandPPopup = true;
        }
        

        // UI Grid -- popup callback -- split number papup
        if (def.col && def.col.field == 'splitNumber') {
            $scope.splitPopupPopup = true;
        }
        
    }
    $scope.addInfoPopupText = "";
    
    $scope.addInfoSaved = function (val) {
        $scope.addInfoPopupText = val;
        $scope.forEditColumnObj.row.entity.AddInfo = $scope.addInfoPopupText;
        //console.log(val);
    };


    $scope.addInfoPopupAttachment = "";
    $scope.hideDownloadTemplate = true;

    $scope.addInfoSavedClick = function (val) {
        $scope.addInfoPopupAttachment = val;
        $scope.forEditColumnObj.row.entity.AddInfoAttach = $scope.addInfoPopupAttachment;
        //console.log(val);
    };

    //UI grid -- Items
    $scope.itemConfig = [
            {
                "field": "lineNumber",
                "width": 150,
                "displayName": "Line Number",
            
                "isVisible": true,
                "isReadOnly": true,
                "autoIncrement": true,
                "filterObject": { "enableFiltering": false },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            }, {
                "field": "itemType.key",
                "width": 150,
                "displayName": "Item Type",
          
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": false },
                "type": "dropdown",
                "attributes": {
                    "model": "type",
                    "dataKey": "key",
                    "options": [
                      {
                          "code": "Material",
                          "key": "Material"
                      },
                      {
                          "code": "VariableService",
                          "key": "Variable Service"
                      },
                      {
                          "code": "Fixed Service",
                          "key": "FixedService"
                      },
                      {
                          "code": "MilestonePayment",
                          "key": "Milestone Payment"
                      }
                    ]
                }
            },
            {
                "field": "itemNumber",
                "width": 150,
                "displayName": "Item Number",
             
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": false },
                "type": "editable"
            },
           
            {
                "field": "supItemNumber",
                "width": 150,
                "displayName": "Supplier Item Number ",
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": false },
                "type": "editable"
            },{
                "field": "description",
                "width": 150,
                "displayName": "Item Description",
            
                "isVisible": true,
                "isReadOnly": false,
                "autoIncrement": false,
                "filterObject": { "enableFiltering": false },
                "type": "editable"
            },{
                "field": "qtyEfforts",
                "width": 150,
                "displayName": "Quantity/Efforts",
                "isVisible": true,
                "filterObject": { "enableFiltering": false },
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {
                "field": "uom.name",
                "name": "uom.name",
                "width": 150,
                "displayName": "UOM",
                "isVisible": true,
                "isRegFocusCol": true,
                "filterObject": { "enableFiltering": false },
                "type": "dropdown",
                "attributes": {
                    "model": "type",
                    "dataKey": "name",
                    "options": [
                      {
                          "code": "EA",
                          "name": "Each"
                      },
                      {
                          "code": "ALL",
                          "name": "All"
                      },
                      {
                          "code": "HR",
                          "name": "Hr"
                      }
                    ]
                }
            },
            {
                "field": "unitPrice",
                "width": 150,
                "filterObject": { "enableFiltering": false },
                "displayName": "Unit Price (USD)",
                "type": "editable",
                "attributes": {
                    "type": "number"
                }
            },
            {

                "field": "servStartDate",
                "width": 150,
                "displayName": "Service Start Date",
                "isMandatory": true,
                "isVisible": true,
                "attributes": {
                    "type": "date",
                    "format": "dd/MM/yyyy"
                },
                "filterObject": { "enableFiltering": false },
                "type": "editable"
            },
            {
                "field": "servEndDate",
                "width": 150,
                "displayName": "Service End Date",
                "isMandatory": true,
                "isVisible": true,
                "filterObject": { "enableFiltering": false },
                "type": "editable",
                "attributes": {
                    "type": "date",
                    "format": "dd/MM/yyyy"
                }
            },
            {
                 "field": "taxExempt.name",
                 "width": 150,
                 "displayName": "Tax Exempt",
                 "isRegFocusCol": true,
                 "isVisible": true,
                 "filterObject": { "enableFiltering": false },
                  "type": "dropdown",
                "attributes": {
                    "model": "type",
                    "dataKey": "name",
                    "options": [
                      {
                          "code": "yes",
                          "name": "Yes"
                      },
                      {
                          "code": "No",
                          "name": "No"
                      }
                    ]
                }
             },
            {
                 "field": "taxes",
                 "width": 150,
                 "displayName": "Taxes (USD)",
                 "isRegFocusCol": true,
                 "isVisible": true,
                 "filterObject": { "enableFiltering": false },
                 "attributes": {
                     "type": "number"
                 },
                 "type": "editable"
             }, {
                 "field": "matching.name",
                 "width": 150,
                 "displayName": "Matching",
                 "isRegFocusCol": true,
                 "isVisible": true,
                 "filterObject": { "enableFiltering": false },
                  "type": "dropdown",
                "attributes": {
                    "model": "type",
                    "dataKey": "name",
                    "options": [
                      {
                          "code": "2Way",
                          "name": "2 Way"
                      },
                      {
                          "code": "3Way",
                          "name": "3 Way"
                      }
                    ]
                }
             },
             {
                 "field": "otherCharges",
                 "width": 150,
                 "displayName": "Other Charges (USD)",
                 "isRegFocusCol": true,
                 "isVisible": true,
                 "filterObject": { "enableFiltering": false },
                 "attributes": {
                     "type": "number"
                 },
                 "type": "editable"
             },
            {
                 "field": "shippingFreight",
                 "width": 150,
                 "displayName": "Shipping & Freight (USD)",
                 "isRegFocusCol": true,
                 "isVisible": true,
                 "filterObject": { "enableFiltering": false },
                 "attributes": {
                     "type": "number"
                 },
                 "type": "editable"
             },
            {
                "field": "shipTo.address",
                "width": 210,
                "displayName": "Ship to Location",
                "isVisible": true,
                "filterObject": { "enableFiltering": false },
                "type": "editable"
            },
            {
                "field": "deliverTo.address",
                "width": 160,
                "displayName": "Deliver to Location",
                "isVisible": true,
                "filterObject": { "enableFiltering": false },
                "type": "editable"
            }
    ];
    $scope.itemModel = [
     {
    "lineNumber": 1,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0011"
  },
  {
    "lineNumber": 2,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0012"
  },
  {
    "lineNumber": 3,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0013"
  },
  {
    "lineNumber": 4,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0014"
  },
  {
    "lineNumber": 5,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0015"
  },
  {
    "lineNumber": 6,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0016"
  },
  {
    "lineNumber": 7,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0017"
  },
  {
    "lineNumber": 8,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0018"
  },
  {
    "lineNumber": 9,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0019"
  },
  {
    "lineNumber": 10,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0020"
  },
  {
    "lineNumber": 11,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0021"
  },
  {
    "lineNumber": 12,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0022"
  },
  {
    "lineNumber": 13,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0023"
  },
  {
    "lineNumber": 14,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0024"
  },
  {
    "lineNumber": 15,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0025"
  },
  {
    "lineNumber": 16,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0026"
  },
  {
    "lineNumber": 17,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0027"
  },
  {
    "lineNumber": 18,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0028"
  },
  {
    "lineNumber": 19,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0029"
  },
  {
    "lineNumber": 20,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0030"
  },
  {
    "lineNumber": 21,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0031"
  },
  {
    "lineNumber": 22,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0032"
  },
  {
    "lineNumber": 23,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0033"
  },
  {
    "lineNumber": 24,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0034"
  },
  {
    "lineNumber": 25,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0035"
  },
  {
    "lineNumber": 26,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0036"
  },
  {
    "lineNumber": 27,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0037"
  },
  {
    "lineNumber": 28,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0038"
  },
  {
    "lineNumber": 29,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0039"
  },
  {
    "lineNumber": 30,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0040"
  },
  {
    "lineNumber": 31,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0041"
  },
  {
    "lineNumber": 32,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_ServiceVariable",
      "key": "Service - Variable"
    },
    "itemNumber": "ITM-009",
    "supItemNumber": "SITM-009",
    "description": "Java Developer",
    "qtyEfforts": 5,
    "uom": {
      "code": "HR",
      "name": "Hr"
    },
    "unitPrice": 155,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-06-15T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "3Way",
      "name": "3 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0042"
  },
  {
    "lineNumber": 33,
    "itemType": {
      "id": 1,
      "name": "P2P_REQ_Material",
      "key": "Material"
    },
    "itemNumber": "ITM-008",
    "supItemNumber": "SITM-008",
    "description": "Java Enterprise Software",
    "qtyEfforts": 15,
    "uom": {
      "code": "EA",
      "name": "Each"
    },
    "unitPrice": 160,
    "servStartDate": "2017-05-31T12:00:00Z",
    "servEndDate": "2017-05-31T12:00:00Z",
    "taxExempt": {
      "code": "yes",
      "name": "Yes"
    },
    "taxes": 0,
    "matching": {
      "code": "2Way",
      "name": "2 Way"
    },
    "otherCharges": 0,
    "shippingFreight": 0,
    "shipTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "deliverTo": {
      "name": "Tata Inc Stalingrad",
      "address": "Tata Inc Stalingrad"
    },
    "$$hashKey": "uiGrid-0043"
  }
];

//basic detail tab
 $scope.itemBasicConfig = [
   {
    "field": "InvName",
    "width": 150,
    "displayName": "Invoice Name",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  }, {
    "field": "Organization",
    "width": 150,
    "displayName": "Organization",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  }, {
    "field": "InvNumber",
    "width": 150,
    "displayName": "Invoice Number",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  }, {
    "field": "SupCode",
    "width": 150,
    "displayName": "Supplier Code",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  }, {
    "field": "SupName",
    "width": 150,
    "displayName": "Supplier Name",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  }, {
    "field": "OrderNumber",
    "width": 150,
    "displayName": "Order Number",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
  {
    "field": "SupInvNumber",
    "width": 150,
    "displayName": "Supplier Invoice Number ",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "CompanyCode",
    "width": 150,
    "displayName": "Company Code ",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "SupInvDate",
    "width": 150,
    "displayName": "Supplier Invoice Date",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
     "attributes": {
    "type": "date",
       "format": "dd/MM/yyyy"
       
     },
    "type": "editable"
  }
,
    {
    "field": "InvRecDate",
    "width": 150,
    "displayName": "Invoice Received Date",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },  
    "attributes": {
    "type": "date",
       "format": "dd/MM/yyyy"
       
     },
    "type": "editable"
  }
  ,
    {
    "field": "RemittoLoc",
    "width": 150,
    "displayName": "Remit to Location",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "OrderContact",
    "width": 150,
    "displayName": "Order Contact",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "OrderingLoc",
    "width": 150,
    "displayName": "Ordering Location",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "BilltoLoc",
    "width": 150,
    "displayName": "Bill to Location ",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "ShiptoLoc",
    "width": 150,
    "displayName": "Ship to Location",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "DelivertoLoc",
    "width": 150,
    "displayName": "Deliver to Location",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "SupplierContact",
    "width": 150,
    "displayName": "Supplier Contact",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "PaymentTerms",
    "width": 150,
    "displayName": "Payment Terms",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "Currency",
    "width": 150,
    "displayName": "Currency",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "PurchaseType",
    "width": 150,
    "displayName": "Purchase Type",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  },
    {
    "field": "InvoiceAmount",
    "width": 150,
    "displayName": "Invoice Amount",
    "isVisible": true,
    "isReadOnly": false,
    "autoIncrement": false,
    "filterObject": {
      "enableFiltering": false
    },
    "type": "editable"
  }
];


 $scope.itemBasicModel = [
  {
    "InvName":"Invoice for Java Services",
    "Organization":"1000 - Tata Purchasing Org",
    "InvNumber":"Inv_Num_2016.05.30-023",
    "SupCode":"257799",
    "SupName":"Oracle Corp",
    "OrderNumber":"PO-05:16-000523-001",
    "SupInvNumber": "Inv_Num_2016.05.25-012",
   "CompanyCode":"1100-Tata Pharmaceuticals Inc",
   "SupInvDate":"2017-05-31T12:00:00Z",
   "InvRecDate":"2017-05-31T12:00:00Z",
   "RemittoLoc":"LC-2016.020470",
   "OrderContact":"TataNew.Admin@123gep.com",
   "OrderingLoc":"Tata Stalingrad",
   "BilltoLoc":"Tata Inc Berlin",
   "ShiptoLoc":"Tata Inc Stalingrad",
   "DelivertoLoc":"Tata Inc Stalingrad",
   "SupplierContact":"saurabh.mehra@gep.com",
   "PaymentTerms":"NET 30 DAYS",
   "Currency":"USD",
    "PurchaseType":"Standard",
    "InvoiceAmount":"3315",
    "$$hashKey": "uiGrid-0012"
  }];

// popup -- taxes -- select item -- item list
    $scope.taxesPopupUrl = "p2p/shared/views/taxesPopup.html";
    $scope.showTaxesPopup = false;
    $scope.showTaxesPopupCallback = function (e) {
        $scope.showTaxesPopup = true;
    };
    $scope.taxesPopUpOnHideCallback = function () {
        $scope.showTaxesPopup = false;
    }

    $scope.showGridSandPPopup = false;
    $scope.showGridSandPCallback = function () {
    	$scope.showGridSandPPopup = true;
    };
    $scope.showGridSandPPopupHideCallback = function (e) {
    	$scope.showGridSandPPopup = false;
    };
	
    $scope.spData = [
		{
			id:"sp1",
			title: "Purchase Order Terms 1",
			codeRev: "PO TERMS/011",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		},
		{
			id: "sp2",
			title: "Purchase Order Terms 2",
			codeRev: "PO TERMS/012",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		},
		{
			id: "sp3",
			title: "Purchase Order Terms 3",
			codeRev: "PO TERMS/013",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		},
		{
			id: "sp4",
			title: "Purchase Order Terms 4",
			codeRev: "PO TERMS/014",
			fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
			isChecked: false
		}
    ];    
    $scope.indexToShow = 0;
    $scope.selectedSandP = $scope.spData[$scope.indexToShow];

	function setActive(index) {
		$scope.indexToShow = index;
		$scope.selectedSandP = $scope.spData[index];
	}

	$scope.selectedItem = function (index) {
		setActive(index);
	};
	$scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
	$scope.showSPPopup = false;
	$scope.showSPPopupCall = function () {
		$scope.showGridSandPPopup = false;
		$scope.titleSandPPopup = "ADD NEW STANDARD AND PROCEDURE";
		$scope.selectedSP = {};
		$scope.showSPPopup = true;
	}
	$scope.hideSPPopupCall = function (e) {
		$scope.showGridSandPPopup = true;
		$scope.showSPPopup = false;
	}
	$scope.editSandPGridCall = function (spObj) {
		$scope.showGridSandPPopup = false;
		$scope.titleSandPPopup = "EDIT STANDARD AND PROCEDURE";
		$scope.selectedSP = spObj;
		$scope.showSPPopup = true;
		$scope.isEditMode = true;
	}
    // popup -- manufacturer details -- express list -- grid Data
   
    $scope.expressLists = [
       { itemNumber: 'dell', name: '123-342-232', modelNo: '123', actionIconDelete: true },
       { itemNumber: 'Lenovo', name: '345-342-354', modelNo: '456', actionIconDelete: true },
       { itemNumber: 'dell', name: '636-436-236', modelNo: '789', actionIconDelete: true },
       { itemNumber: 'Lenovo', name: '428-472-344', modelNo: '912', actionIconDelete: true },
       { itemNumber: 'Sumsung', name: '288-2898-889', modelNo: '345', actionIconDelete: true, actionIconAdd: true }
    ];

    // popup -- manufacturer details -- express list -- grid Data -- remove the row specified in index
    $scope.removeRow = function (index) {
        // remove the row specified in index
        $scope.expressLists.splice(index, 1);
        // if no rows left in the array create a blank array
        if ($scope.expressLists.length === 0) {
            $scope.expressLists = [];
        }

        // remove the row specified in index
        $scope.splitList.splice(index, 1);
        // if no rows left in the array create a blank array
        if ($scope.splitList.length === 0) {
            $scope.splitList = [];
        }
    };

    // popup -- manufacturer details -- express list -- grid Data -- add a row in the array
    $scope.addRow = function () {
        $scope.expressLists[$scope.expressLists.length - 1].actionIconAdd = false;
        $scope.expressLists.push({ itemNumber: '', name: '', modelNo: '', actionIconAdd: true, actionIconDelete:true});

        var count = $scope.splitList.length + 1;
        $scope.splitList.push({ splitNumber: count, splitValue: '00', actionIconDelete: true });
    };

    // popup -- split 
    $scope.splitPopupUrl = "p2p/req/views/popupSplit.html";
    $scope.splitPopupPopup = false;
    $scope.splitPopupCallback = function (e) {
        $scope.splitPopupPopup = true;
    };
    $scope.splitPopupPopupHideCallback = function (e) {
        $scope.splitPopupPopup = false;
    };
    $scope.splitList = [
        { splitNumber: '1', splitValue: '20', actionIconDelete: true },
        { splitNumber: '2', splitValue: '20', actionIconDelete: true },
        { splitNumber: '3', splitValue: '20', actionIconDelete: true },
        { splitNumber: '4', splitValue: '20', actionIconDelete: true },
        { splitNumber: '5', splitValue: '20', actionIconDelete: true }
    ];
    $scope.splitType = [{ title: 'Number' }, { title: 'Percentage' }];
    $scope.selectedSplit = { title: 'Number' };
    $scope.splitFlag = true;
    $scope.onChangeSplit = function (selectedSplit) {
        if (selectedSplit.title == 'Number') {
            $scope.splitFlag = true;
        }
        else if (selectedSplit.title == 'Percentage') {
            $scope.splitFlag = false;
        }
    }

    // popup -- split -- focus
    $scope.addFocuse = function (obj) {
        obj.qtyfocus = true;
    };


    // popup -- Add Taxes -- grid Data -- add a row in the array
    $scope.taxList = {
        'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false
    };

    $scope.taxesDetailLists = [
                { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description 1', 'taxRate': '10', 'showEdithCurrentPanel': false },
               { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description 2', 'taxRate': '68', 'showEdithCurrentPanel': false },
                { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description 3', 'taxRate': '5', 'showEdithCurrentPanel': false },
               { 'taxCode': 'TAX0006119', 'taxDetail': 'Sample Tax Description 4', 'taxRate': '79', 'showEdithCurrentPanel': false }
    ];

    // popup -- Add Taxes -- grid Data -- add new row
    $scope.addCurrent = function () {
        if ($scope.taxList.taxCode != '') {
            $scope.taxesDetailLists.push($scope.taxList);
            $scope.taxList = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false };
        }
        updatePersentage();
    }

    // popup -- Add Taxes -- grid Data -- iffy function for percentage
    function updatePersentage() {
        var sum = 0;
        for (var i = 0; i < $scope.taxesDetailLists.length; i++) {
            sum += parseInt($scope.taxesDetailLists[i].taxRate, 10);
        }
        $scope.totalPercentage = sum / $scope.taxesDetailLists.length;
    }
    updatePersentage();
    $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': false };
    $scope.taxfocus = false;

    // popup -- Add Taxes -- grid Data -- delete current row
    $scope.delCurrent = function (current) {
        var msgDetails = "<p class='left-align'>Are you Sure for Delete Current Item ''" + $scope.taxesDetailLists[current].taxDetail + "''</p>";
        var confi = {
            type: "warning",
            message: msgDetails,
            buttons: [
            {
                "title": "YES",
                "result": "yes"
            },
            {
                "title": "NO",
                "result": "no"
            }
            ]
        };

        notification.notify(confi, function (response) {
            if (response.result == 'yes') {
                $scope.taxesDetailLists.splice(current, 1);
                Materialize.toast('Tax deleted successfully', 2000);
            }
            updatePersentage();
        });

        
    };

    // popup -- Add Taxes -- grid Data -- edit current row
    $scope.editCurrent = function (current) {
        $scope.taxfocus = true
        $scope.taxesDetailLists[current].showEdithCurrentPanel = true;
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        $scope.updatedCurrentTax.taxCode = getcurrentTaxValue.taxCode;
        $scope.updatedCurrentTax.taxDetail = getcurrentTaxValue.taxDetail;
        $scope.updatedCurrentTax.taxRate = getcurrentTaxValue.taxRate;
        updatePersentage();
    };

    // popup -- Add Taxes -- grid Data -- update current row with edited value
    $scope.updatedEdited = function (current) {
        var getcurrentTaxValue = $scope.taxesDetailLists[current];
        if ($scope.updatedCurrentTax.taxCode != '') {
            getcurrentTaxValue.taxCode = $scope.updatedCurrentTax.taxCode;
            getcurrentTaxValue.taxDetail = $scope.updatedCurrentTax.taxDetail;
            getcurrentTaxValue.taxRate = $scope.updatedCurrentTax.taxRate;
            $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
            $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': true };
        }
        updatePersentage();
        Materialize.toast('Tax edited Successfully', 2000);
    };

    // popup -- Add Taxes -- grid Data -- cancel editing activity
    $scope.cancelUpdatedEdited = function (current) {
        $scope.taxesDetailLists[current].showEdithCurrentPanel = false;
        $scope.updatedCurrentTax = { 'taxCode': '', 'taxDetail': '', 'taxRate': '', 'showEdithCurrentPanel': true };
    }

    // popup -- Add Taxes -- grid Data -- apply function
    $scope.applyFn = function () {
        Materialize.toast('Tax Added Successfully', 2000);
    }

    $scope.uploadTitle = "ADD ATTACHMENTS";
    $scope.attachmentMsg = "Supported file formats: doc, docs,pdf, jpg, jpeg, png, tiff.\
        <br />Limited to file(s) of 10MB each.\
	    <br /> Maximum 5 files can be uploaded.";
    $scope.attachmentMsg = $sce.trustAsHtml($scope.attachmentMsg);
    $scope.attchmentMsg = $scope.attachmentMsg;
    $scope.attachFlag = false;
    $scope.attachmentList = [
		{
		    name: "AttachmentOne.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentTwo.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentThree.xls",
		    status: "fail",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: false
		},
		{
		    name: "AttachmentFive.xls",
		    status: "success",
		    referenceName: "Add Name",
		    isShow: true,
		    actionIconDelete: true
		}
    ];
    $scope.attachmentCall = function (e) {
        $scope.attachFlag = true;
        for (var i = 0; i < $scope.attachmentList.length; i++) {
            $scope.attachmentList[i].isShow = true;
        }
    };
    $scope.closeAttachment = function (el) {
        el.isShow = false;
    }

    $scope.retryCall = function (el) {
        el.status = "success";
    }
    $scope.removeRow = function (el) {
        // remove the row specified in index
        if ($scope.attachmentList.length > 1) {
            if ($scope.attachmentList.length == 2) {
                $scope.attachmentList[1].actionIconDelete = false;
            }
            $scope.attachmentList.splice(index, 1);
        }
    };
    $scope.showUploadPopup = false;
    $scope.adduploadCallback = function (e) {
        $scope.showUploadPopup = true;
    }
    $scope.hideUploadPopupCallback = function (e) {
        $scope.showUploadPopup = false;
    }
    $scope.showNotesAttach = false;
    $scope.showNotesAttachCall = function () {
        $scope.attachNotesName = "";
        $scope.attachNotesDesp = "";
        $scope.showNotesAttach = true;
    }
    $scope.hideNotesAttachPopupCallback = function (e) {
        $scope.showNotesAttach = false;
    }
    $scope.showExternalLinkAttach = false;
    $scope.showExternalLinkAttachCall = function () {
        $scope.attachExternalL = "";
        $scope.showExternalLinkAttach = true;
    }
    $scope.hideExternalLinkAttachPopupCallback = function (e) {
        $scope.showExternalLinkAttach = false;
    }
}
function p2pPdfViewerCtrlFunc($scope, notification, $sce, $timeout,$http) {

	$scope.hideHeader = function(){

		angular.element('header').hide();
	}

	 $scope.pageLoaded = function(curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };

    $scope.loadProgress = function(loaded, total, state) {
      $scope.hideHeader();
    };

	$scope.docURL = 'shared/resources/images/TATA invoice.pdf';
    $scope.pdfScale = 1.0;
  



}