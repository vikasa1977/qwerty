describe('utils service', function(){
    var scope, utilsService;
	
    beforeEach(function() {
        module('SMART2');
        inject(function ($rootScope, utils) {
			scope = $rootScope.$new();
            utilsService = utils;
        });
    });
	
    it('should do addition', function () {
        expect(utilsService.add(5, 2)).toEqual(7);
    });
	
	it('should do subtraction', function () {
        expect(utilsService.subtract(5, 2)).toEqual(3);
    });
	
	it('should do division', function () {
		expect(utilsService.divide(5, 2)).toEqual(2.5);
    });
	
	it('should do multiplication', function () {
		expect(utilsService.multiply(5, 2)).toEqual(10);
    });
});