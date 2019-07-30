(function (angular) {
	'use strict';
	angular
    .module('SMART2')
    .controller('certificateCtrl', ['$scope', '$sce', '$filter', '$state', certificateCtrlFunc])

	function certificateCtrlFunc($scope, $sce, $filter, $state) {
		var todaydate = $filter('date')(new Date(), 'dd/MM/yyyy');
		$scope.pageTitle = 'NEW CERTIFICATE';
		$scope.certificateData = {
			"certificatename": {
				"displaytext": "Certificate Name",
				"selectedoption": {},
				"options": [{ "name": "ISO 9001", "check": false }, { "name": "ISO 9002", "check": false }, { "name": "ISO 9003", "check": false }, { "name": "ISO 14001", "check": false }, { "name": "ISO 27001/2", "check": false }, { "name": "TL 9000", "check": false }, { "name": "TS 16949", "check": false }, { "name": "C-TPAT", "check": false }, { "name": "SSAE-16 Type 1", "check": false }, { "name": "SSAE-16 Type 2", "check": false }, { "name": "SOC 2 Type 1", "check": false }, { "name": "SOC 2 Type 2", "check": false }, { "name": "SOC 3 Type 1", "check": false }, { "name": "SOC 3 Type 2", "check": false }, { "name": "ISAE 3402", "check": false }, { "name": "SIG", "check": false }, { "name": "SIG Lite", "check": false }, { "name": "Dun & Bradstreet", "check": false }, { "name": "Business Continuity Plan", "check": false }, { "name": "Disaster Recovery Plan", "check": false }, { "name": "FBI Identification Certification", "check": false }, { "name": "CI-DSS AoC Certification", "check": false }, { "name": "Audited Financials", "check": false }]
			},
			"certificatetype": {
				"selectedType": ""
			},
			"diversitytype": {
				"selectedType": ""
			},
			"certificatenumber": "",
			"issuingauthority": "",
			"selectedCompliance": {
				"selectedType": ""
			},
			"buyercontacts": {
				"displaytext": "Buyer Contacts",
				"selectedoption" : [],
				"options": [{ "name": "Carissa Madden", "check": false }, { "name": "Dotson Palmer", "check": false }, { "name": "Meyer Lloyd", "check": false }, { "name": "Flossie Ochoa", "check": false }, { "name": "Leah Moses", "check": false }, { "name": "Ferguson Osborn", "check": false }, { "name": "Peck Patterson", "check": false }, { "name": "Gay Payne", "check": false }, { "name": "Katie Hebert", "check": false }, { "name": "Bryan Shannon", "check": false }, { "name": "Skinner Farmer", "check": false }, { "name": "Mckay Mcneil", "check": false }, { "name": "Lila Horne", "check": false }, { "name": "Ethel Powell", "check": false }, { "name": "Spears Lott", "check": false }, { "name": "Nannie Ryan", "check": false }, { "name": "Joy Ware", "check": false }, { "name": "Shaffer Mcfadden", "check": false }, { "name": "Audrey Pena", "check": false }, { "name": "Helga Macdonald", "check": false }]
			},
			"suppliercontacts": {
				"displaytext": "Supplier Contacts",
				"selectedoption": [],
				"options": [{ "name": "Carissa Madden", "check": false }, { "name": "Dotson Palmer", "check": false }, { "name": "Meyer Lloyd", "check": false }, { "name": "Flossie Ochoa", "check": false }, { "name": "Leah Moses", "check": false }, { "name": "Ferguson Osborn", "check": false }, { "name": "Peck Patterson", "check": false }, { "name": "Gay Payne", "check": false }, { "name": "Katie Hebert", "check": false }, { "name": "Bryan Shannon", "check": false }, { "name": "Skinner Farmer", "check": false }, { "name": "Mckay Mcneil", "check": false }, { "name": "Lila Horne", "check": false }, { "name": "Ethel Powell", "check": false }, { "name": "Spears Lott", "check": false }, { "name": "Nannie Ryan", "check": false }, { "name": "Joy Ware", "check": false }, { "name": "Shaffer Mcfadden", "check": false }, { "name": "Audrey Pena", "check": false }, { "name": "Helga Macdonald", "check": false }]
			},
			"includeSupplierManager": "",
			"startreminderdate": "",
			"recurrencedate": "",
			"attachmentsData": [[{ "effectivefrom": "",  "effectiveon": "", "filename": "attachment.pdf", "uploadedby": "Karthic Mehta", "uploadedon": todaydate }]]
		};
		$scope.pageForDiversity = false;

		if ($state.current.name == 'diversity') {
			$scope.pageForDiversity = true;

			$scope.pageTitle = 'NEW DIVERSITY STATUS';
		}


		$scope.certificateTypeOptions = [{ "name": "COI - Certificate Of Insurance" }, { "name": "Diversity" }, { "name": "ISO - International Standardisation Organisation" }, { "name": "PCI - Payment Card Industry Security Standard Reports" }, { "name": "R Stamp" }, { "name": "SOC - Service Organization Control Reports" }, { "name": "TQM - Total Quality Management" }, { "name": "Other" }, { "name": "Owners/contractors Protect" }, { "name": "Pollution Liability" }, { "name": "PRO Liability E&amp;O" }, { "name": "Transit Cargo Liability" }, { "name": "Workers Comp Liability" }, { "name": "Garage Liability" }, { "name": "Coml Property  Liability" }, { "name": "Fidielity Bond Liability" }];
		$scope.diversityTypeOptions = [{ "name": "Minority Business Enterprise (MBE) - African American" }, { "name": "Minority Business Enterprise (MBE) - Asian-Indian American" }, { "name": "Minority Business Enterprise (MBE) - Asian-Pacific American" }, { "name": "Minority Business Enterprise (MBE) - Hispanic American" }, { "name": "Minority Business Enterprise (MBE) - Native American" }, { "name": "Minority Business Enterprise (MBE) - Alaskan Native" }, { "name": "Minority Business Enterprise (MBE) - Other" }, { "name": "Minority Institutions or Historically Black College" }, { "name": "Lesbian, Gay, Bisexual, Transgender (LGBT)" }, { "name": "Historically Underutilized Business Zone Small Business (HUBZone)" }, { "name": "Service - Disabled Veteran - Owned Small Business (SDVOSB)" }, { "name": "Small Disadvantaged Business (SDB)" }, { "name": "Veteran - Owned Small Business (VOSB)" }, { "name": "Women Business Enterprise (WBE)" }, { "name": "Woman - Owned Small Business (WOSB)" }, { "name": "8A –Certified Supplier to the U.S. Federal Government" }, { "name": "Foreign Business" }, { "name": "Non-Profit Business" }];
		$scope.selectedOptionCompliance = [{ "name": "Yes" }, { "name": "No" }];

		// Start: Add guideline popup
		$scope.docDiscription = {
			docName: "Upload Document",
			fileSupport: "Supported file formats : Image , PDF, Word , Excel or  PPT Files.",
			fileSize: "Limited to file(s) of 5MB each.",
			fileLimit: "Maximum 5 files can be uploaded."
		}
		$scope.types = {
			fileType: ".jpg, .jpg, .pdf, .docx"
		}
		$scope.addDocumentPoupUrl = "shared/popup/views/popupUploadDoc.html";
		$scope.addDocumentPopup = false;
		$scope.addDocumentPopupLevel = '';
		$scope.addDocumentPopupCallback = function (arg, Ind) {
		    debugger;
			$scope.uploadTitle = "ADD ATTACHMENT";
			$scope.uploadTitleContent = "Upload Attachments";
			$scope.addDocumentPopup = true;
			$scope.addDocumentPopupLevel = arg;
			$scope.uploadIndex = Ind;
		}
		var attachmentMsg = "Supported file formats: doc, docs, df, jpg, jpeg, png, tiff.\
            <br />Limited to file(s) of 10MB each.\
                 <br /> Maximum 5 files can be uploaded.";
		$scope.attchmentMsg = $sce.trustAsHtml(attachmentMsg);
		$scope.attachFlag = false;
		$scope.uploadFail = false;
		$scope.attachmentCall = function (e) {
			$scope.attachFlag = true;
			$timeout(function () {
				$scope.uploadFail = true;
			}, 1500);
		};

		$scope.retryCall = function () {
			$scope.uploadFail = false;
		};
		$scope.attachAction = function () {
			if ($scope.addDocumentPopupLevel === 'child') {
				$scope.certificateData.attachmentsData[$scope.uploadIndex].push({ "effectivefrom": "",  "effectiveon": "", "filename": "attachment.pdf", "uploadedby": "Karthic Mehta", "uploadedon": todaydate
			});
			} else {
				$scope.activeDateFlag.push(false);
				$scope.certificateData.attachmentsData.push([{ "effectivefrom": "",  "effectiveon": "", "filename": "attachment.pdf", "uploadedby": "Karthic Mehta", "uploadedon": todaydate }]);
			}

		};
		$scope.closeAttachment = function () {
			$scope.attachFlag = false;
			$scope.uploadFail = false;
		};
		$scope.hideAddDocumentPopupCallback = function (e) {
			$scope.addDocumentPopup = false;
		};
		$scope.deleteAttachment = function (arg,ind,parInd) {
			if (arg === 'child') {
				$scope.certificateData.attachmentsData[parInd].splice(ind, 1);
			}
		};

		$scope.fillpartialcontentList = { 'check': false };
		$scope.certificatsDataHead = { 'check': false };
		$scope.deletetableListData = function (data, flagPartial, flagHead) {

			var dataIndex = [],
				sliceIndex = 0;
			angular.forEach(data, function (val, key) {
				angular.forEach(val, function (val, keys) {
				if (val.check) {
					dataIndex.push(key);
				}
			});
			});
			angular.forEach(dataIndex, function (val, key) {
				if (sliceIndex) {
					data.splice(val - 1, 1);
					$scope.activeDateFlag.splice(val - 1, 1);
				} else {
					data.splice(val, 1);
					$scope.activeDateFlag.splice(val, 1);
					sliceIndex = 1
				}
			});
			flagPartial.check = false;
			flagHead.check = false;
		};

		$scope.onChangecontentList = function (checkHead, data, fillpartial) {

			var counter = 0;
			for (var i = 0; i < data.length; i++) {
				if (data[i].check == true) {
					counter++;
				}
			}
			fillpartial.check = true;
			if (counter === 0) {
				fillpartial.check = false;
				checkHead.check = false;
			} else if (counter === data.length) {
				fillpartial.check = false;
				checkHead.check = true;
			} else {
				fillpartial.check = true;
				checkHead.check = true;
			}
		};
		$scope.activeDateFlag = [false];
		$scope.dateChangefunc = function (sDate, eDate, pInd) {
			var todayD = new Date().getTime();
			if (todayD >= (sDate - 86398999) && todayD <= eDate) {
				$scope.activeDateFlag[pInd] = true;
			} else {
				$scope.activeDateFlag[pInd] = false;
			}
		};
	}
})(angular);

