angular
    .module('SMART2')
    .controller('sideNavCtrl', ['$scope', '$rootScope', 'notification', 'storeService', sideNavCtrlFunc]);

function sideNavCtrlFunc($scope, $rootScope, notification, storeService) {
    $scope.$on('handleBroadcast', function (e, args) {
        $scope.sideNavComp = args.navFlag;
    });
    
    $scope.phoneContacts = [
        {
            "country": "US",
            "phoneNumbers":[
               { "isdCode": "1", "number": "732 428 1578" },
               { "isdCode": "2", "number": "732 428 1578" },
            ]
        },
        {
            "country": "Europe",
            "phoneNumbers":[
              { "isdCode": "42", "number": "022 598 6501" },
            ]
        },
        {
            "country": "Asia",
            "phoneNumbers":[
                { "isdCode": "91", "number": "22 6137 2148" },
            ]  
        },
        {
            "country": "Australia",
            "phoneNumbers":[
                { "isdCode": "61", "number": "2 8518 1914" },
            ]   
        },
        {
            "country": "UK",
            "phoneNumbers":[
                { "isdCode": "44", "number": "-1-416-482-2900" },
            ]   
        },
        {
            "country": "Canada",
            "phoneNumbers":[
                { "isdCode": "1", "number": "22 6137 2148" },
            ]   
        },
        { "country": "China", 
        "phoneNumbers":[
                { "isdCode": "86", "number": "21-3115-9119" },
                { "isdCode": "86", "number": "21-3115-5061" },
        ]
        }
    ];
    $scope.emailContacts = [
       { "country": "Singapore", "email": "Procurement.SGP@Gep.Com" },
       { "country": "Malaysia", "email": "Procurement.MYS@Gep.Com" },
       { "country": "Australia/NZ", "email": "Procurement.ANZ@Gep.Com" },
       { "country": "Japan", "email": "Procurement.JPN@Gep.Com" },
       { "country": "South Korea", "email": "Procurement.KOR@Gep.Com" },
       { "country": "Thailand", "email": "Procurement.THA@Gep.Com" },
       { "country": "China", "email": "Procurement.CHN@Gep.Com" },
       { "country": "India", "email": "Procurement.IND@Gep.Com" },
       { "country": " South Africa", "email": "Procurement.SA@Gep.Com" },
        { "country": " KNA", "email": "Procurement.Kna@Gep.Com" }
    ];


    $scope.internalExternalNotificationData = [{
        "title": "INTERNAL",
        "contentUrl": "shared/sideNav/views/internalNotificationTemplate.html",
        "active": true
    },
        {
            "title": "EXTERNAL",
            "contentUrl": "shared/sideNav/views/externalNotificationTemplate.html"
        }
    ];

    $scope.internal = [{
        'title': 'A corporation is a company or group of people',
        'image': 'internal_img.jpg',
        'publishDate': '2 Feb 2016',
        'discription': 'Lorem ipsum dolor sit amet, tantas luptatum dignissim sit in, ius eu lorem soleat',
        'type': 'Internal',
        'attachments': [{ name: 'file1', type: 'xls', size: '456 KB' }, { name: 'file2', type: 'docx', size: '2256 KB' }, { name: 'file3', type: 'ppt', size: '89 KB' }, { name: 'file2', type: 'jpg', size: '856 KB' }]
    }, {
        'title': 'A corporation is a company or group of people',
        'image': 'internal_img.jpg',
        'publishDate': '2 Feb 2016',
        'discription': 'Lorem ipsum dolum dignissim sit in, ius eu lorem soleat',
        'type': 'Internal',
        'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }, { name: 'file2', type: 'docx', size: '2256 KB' }, { name: 'file3', type: 'ppt', size: '89 KB' }, { name: 'file2', type: 'jpg', size: '856 KB' }]
    }, {
        'title': 'A corporation is a company or...',
        'image': 'internal_img.jpg',
        'publishDate': '2 Feb 2016',
        'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
        'type': 'Internal',
        'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }, { name: 'file2', type: 'docx', size: '2256 KB' }, { name: 'file3', type: 'ppt', size: '89 KB' }, { name: 'file2', type: 'jpg', size: '856 KB' }]
    }];

    $scope.external = [{
        'title': 'A corporation is a company or group of people',
        'image': 'internal_img.jpg',
        'publishDate': '2 Feb 2016',
        'discription': 'Lorem ipsum dolor sit amet, tantas luptatum dignissim sit in, ius eu lorem soleat',
        'type': 'External',
        'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }, { name: 'file2', type: 'docx', size: '2256 KB' }, { name: 'file3', type: 'ppt', size: '89 KB' }, { name: 'file2', type: 'jpg', size: '856 KB' }]
    }, {
        'title': 'A corporation is a company or group of people',
        'image': 'internal_img.jpg',
        'publishDate': '2 Feb 2016',
        'discription': 'Lorem ipsum dolum dignissim sit in, ius eu lorem soleat',
        'type': 'External',
        'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }, { name: 'file2', type: 'docx', size: '2256 KB' }, { name: 'file3', type: 'ppt', size: '89 KB' }, { name: 'file2', type: 'jpg', size: '856 KB' }]
    }, {
        'title': 'A corporation is a company or...',
        'image': 'internal_img.jpg',
        'publishDate': '2 Feb 2016',
        'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
        'type': 'External',
        'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }, { name: 'file2', type: 'docx', size: '2256 KB' }, { name: 'file3', type: 'ppt', size: '89 KB' }, { name: 'file2', type: 'jpg', size: '856 KB' }]
    }, {
        'title': 'A corporation is a company or...',
        'image': 'internal_img.jpg',
        'publishDate': '2 Feb 2016',
        'discription': 'Lorem ipsum dolor met, tantas lut in, ius eu lorem soleat',
        'type': 'External',
        'attachments': [{ name: 'file1', type: 'pdf', size: '456 KB' }, { name: 'file2', type: 'docx', size: '2256 KB' }, { name: 'file3', type: 'ppt', size: '89 KB' }, { name: 'file2', type: 'jpg', size: '856 KB' }]
    }];

    $scope.addAnnouncementPopup = false;
    $scope.isAddAnnouncementClicked = false;
    $scope.addAnnouncementPopupCallback = function (item, tabData, evt) {
        evt.preventDefault();
        $scope.isAddAnnouncementClicked = true;
        setTimeout(function () {
            $scope.isAddAnnouncementClicked = false;
            $scope.$apply();
        }, 2000);
        $rootScope.addAnnouncementPopup = true;
        tabData.addState(item);
    }

    //NOTE : Replace flag with View popup
    $scope.viewAnnouncementPopupCall = function (item, tabData,index) {
        $rootScope.addAnnouncementPopup = true;
        if (item.type == "Internal") {
            tabData.viewState(item, index, $scope.internal);
        } else {
            tabData.viewState(item, index, $scope.external);
        }
    }

    //Delete Announcement

    $scope.deleteAnnouncementCall = function (index, announcementType) {
        var deleteWarn = {
            type: "warning",
            message: "Are you sure? , Note: message will update",
            buttons: [
                {
                    title: "Yes",
                    result: "yes"
                },
                {
                    title: "No",
                    result: "no"
                }
            ]
        };
        notification.notify(deleteWarn, function (responce) {
            if (responce.result == 'yes') {

                if (announcementType == "internal" ) {
                    $scope.internal.splice(index, 1);
                }
                    else {
                $scope.external.splice(index, 1);
               
                }
                 
             }
        });
    }

    $scope.editAnnouncementPopupCallback = function (item, tabData,index) {
        $rootScope.addAnnouncementPopup = true;
        if (item.type == "Internal") {
            tabData.editState(item, index, $scope.internal);
        } else {
            tabData.editState(item, index, $scope.external);
        }
    }

    $rootScope.docDiscription = {
        docName: "Upload Document",
        fileSupport: "Supported file formats : doc, docs, df, jpg, jpeg, png, tiff.",
        fileSize: "Limited to file(s) of 10MB each.",
        fileLimit: "Maximum 5 files can be uploaded."
    }
    $scope.types = {
        fileType: ".jpg, .jpg, .pdf, .docx"
    }

    $scope.SmartCoachSwitch = true;
    storeService.set("SmartCoachSwitch", $scope.SmartCoachSwitch);
    $scope.onSmartCoachSwitchClick = function(_arg){
        $scope.SmartCoachSwitch = _arg;
        storeService.set("SmartCoachSwitch", _arg);
    }

    $scope.$on("updateSmartCoachSwitch", function(){
        setTimeout(function(){
            $scope.SmartCoachSwitch = storeService.get("SmartCoachSwitch");
                $scope.$digest();
        }, 1000);
    });
};

