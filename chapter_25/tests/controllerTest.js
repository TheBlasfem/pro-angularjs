describe("Controller Test", function () {

	var mockScope, controller, backend;

	//load modules from angular app
	beforeEach(angular.mock.module("exampleApp"));

	//mock the get request
	beforeEach(angular.mock.inject(function ($httpBackend) {
		backend = $httpBackend;
		backend.expect("GET", "productData.json").respond(
		[{ "name": "Apples", "category": "Fruit", "price": 1.20 },
		{ "name": "Bananas", "category": "Fruit", "price": 2.42 },
		{ "name": "Pears", "category": "Fruit", "price": 2.02 }]);
	}));

	//inject services that my tests needs
	beforeEach(angular.mock.inject(function ($controller, $rootScope, $http) {
		//create a new scope
		mockScope = $rootScope.$new();
		
		//instance defaultCtrl and put all services from the app controller
		$controller("defaultCtrl", {
			$scope: mockScope,
			$http: $http
		});

		//send responses from $httpBackend service
		backend.flush();
	}));

	it("Creates variable", function () {
		expect(mockScope.counter).toEqual(0);
	});

	it("Increments counter", function () {
		mockScope.incrementCounter();
		expect(mockScope.counter).toEqual(1);
	});

	it("Makes an Ajax request", function () {
		//check that all requests have been received
		backend.verifyNoOutstandingExpectation();
	});

	it("Processes the data", function () {
		expect(mockScope.products).toBeDefined();
		expect(mockScope.products.length).toEqual(3);
	});

	it("Preserves the data order", function () {
		expect(mockScope.products[0].name).toEqual("Apples");
		expect(mockScope.products[1].name).toEqual("Bananas");
		expect(mockScope.products[2].name).toEqual("Pears");
	});
});