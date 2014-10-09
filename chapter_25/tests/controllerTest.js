describe("Controller Test", function () {

	var mockScope, controller, backend, mockInterval, mockTimeout, mockLog;

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
	beforeEach(angular.mock.inject(function ($controller, $rootScope, $http, $interval, $timeout, $log) {
		//create a new scope
		mockScope = $rootScope.$new();
		mockInterval = $interval;
		mockTimeout = $timeout;
		mockLog = $log;

		//instance defaultCtrl and put all services from the app controller
		$controller("defaultCtrl", {
			$scope: mockScope,
			$http: $http,
			$interval: mockInterval,
			$timeout: mockTimeout,
			$log: mockLog
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

	it("Limits interval to 10 updates", function () {
		for (var i = 0; i < 11; i++) {
			mockInterval.flush(5000);
		}
		expect(mockScope.intervalCounter).toEqual(10);
	});

	it("Increments timer counter", function () {
		mockTimeout.flush(5000);
		expect(mockScope.timerCounter).toEqual(1);
	});

	it("Writes log messages", function(){
		expect(mockLog.log.logs.length).toEqual(1);
	})
});