describe("Filter Tests", function(){
	var filterInstance;

	beforeEach(angular.mock.module("exampleApp"));

	beforeEach(angular.mock.inject(function($filter){
		filterInstance = $filter("labelCase");
	}));

	it("changes case", function(){
		var result = filterInstance("test phrase");
		expect(result).toEqual("Test phrase");
	});

	it("reverse case", function(){
		var result = filterInstance("Test phrase", true);
		expect(result).toEqual("tEST PHRASE");
	})
});