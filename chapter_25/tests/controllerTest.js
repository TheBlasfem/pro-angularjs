describe("Controller Test", function () {
	var mockScope = {};
	var controller;
	
	//load modules from angular app
	beforeEach(angular.mock.module("exampleApp"));
	
	//inject services that my tests needs
	beforeEach(angular.mock.inject(function ($controller, $rootScope) {
		//create a new scope
		mockScope = $rootScope.$new();
		
		//instance defaultCtrl and put his scope in mockScope object
		controller = $controller("defaultCtrl", {
			$scope: mockScope
		});
	}));
	
	it("Creates variable", function () {
		expect(mockScope.counter).toEqual(0);
	});
	
	it("Increments counter", function () {
		mockScope.incrementCounter();
		expect(mockScope.counter).toEqual(1);
	});
});