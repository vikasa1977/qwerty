angular
	.module('SMART2')
	.controller('implementationProjectCtrl', ['$scope', '$rootScope', '$translate', '$timeout', '$state', '$http', '$filter', 'notification', 'storeService', 'dbFactory', implementationProjectFunc])

function implementationProjectFunc($scope, $rootScope, $translate, $timeout, $state, $http, $filter, notification, storeService, dbFactory) {
    $scope.HC = {
        init: false
    }

    $rootScope.isPageWithoutImage = false;

    $scope.viewConfig = { title: $translate.instant("View Project") };

    $scope.projectCardsContent = [{
        name: "Kellogs Asia Pacific",
        id: 1,
        status: "In Progress",
        startDate: "07/05/2017",
        endDate: "12/06/2017",
        products: "P2P, Contracts, Sourcing, Supplier, Projects",
        taskCompleted: 20,
        isDraggable: true
    }, {
        name: "Kellogs North America",
        id: 2,
        status: "Completed",
        startDate: "07/05/2017",
        endDate: "12/06/2017",
        products: "Contracts, P2P, Sourcing, Supplier",
        taskCompleted: 100,
        isDraggable: true
    }, {
        name: "Kellogs Europe",
        id: 3,
        status: "Not Started",
        startDate: "07/05/2017",
        endDate: "12/06/2017",
        products: "Projects, Contracts, P2P, Supplier",
        taskCompleted: 100,
        isDraggable: true
    }, {
        name: "Kellogs India",
        id: 4,
        status: "Completed",
        startDate: "07/05/2017",
        endDate: "12/06/2017",
        products: "Supplier, Contracts, Sourcing, Projects",
        taskCompleted: 50,
        isDraggable: true
    }, {
        name: "Kellogs South America",
        id: 5,
        status: "Completed",
        startDate: "07/05/2017",
        endDate: "12/06/2017",
        products: "Supplier, Projects",
        taskCompleted: 75,
        isDraggable: true
    }, {
        name: "Kellogs Africa",
        id: 6,
        status: "In Progress",
        startDate: "07/05/2017",
        endDate: "12/06/2017",
        products: "Sourcing, Contracts, Projects, P2P, ",
        taskCompleted: 80,
        isDraggable: true
    }, {
        name: "Kellogs Singapore",
        id: 7,
        status: "In Progress",
        startDate: "07/05/2017",
        endDate: "12/06/2017",
        products: "Contracts, Sourcing, Supplier",
        taskCompleted: 60,
        isDraggable: true
    }, {
        name: "Kellogs Denmark",
        id: 8,
        status: "Completed",
        startDate: "07/05/2017",
        endDate: "12/06/2017",
        products: "P2P, Contracts, Sourcing, Supplier, Projects",
        taskCompleted: 20,
        isDraggable: true
    }];

    $scope.viewProjectCalled = function (obj) {
        $state.go('admin.setupManager.viewProject', { 'id': obj.id });
    }
    $scope.manageProductSettingsCall = function (obj) {
        $state.go('admin.setupManager.configureFeature', { 'id': obj.id });
    }
    $scope.addFeatureCall = function (obj) {
        $state.go('admin.setupManager.addFeature', { 'id': obj.id });
    }
    $scope.responsiveSettings = [{
        method: {},
        breakpoint: 1800,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            //infinite: true,
            dots: true
        }
    }, {
        breakpoint: 1200,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true
        }
    }, {
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true
        }
    }, {
        breakpoint: 900,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
        }
    }];
};