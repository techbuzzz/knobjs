"use strict";

var ko = require("knockout");
var superdata = require("superdata");
var createList = require("../../src/list/vm");

var createProxy = superdata.proxy.memory;
var createModel = superdata.model.model;
var createStore = superdata.store.store;

var proxy = createProxy({
	idProperty: "id",
	route: "/user"
});

var fields = {
	id: {
		type: "number"
	},
	email: {
		type: "string"
	},
	name: {
		type: "string"
	},
	title: {
		type: "string"
	}
};

var model = createModel({
	fields: fields,
	proxy: proxy
});

var store = createStore({
	model: model
});

describe("List", function() {

	describe("without config", function() {
		it("should return an error", function() {
			expect(function() {
				createList();
			}).toThrowError("config.store is mandatory!");
		});
	});

	describe("with invalid config", function() {

		describe("with empty config", function() {
			it("should return an error", function() {
				expect(function() {
					createList({});
				}).toThrowError("config.store is mandatory!");
			});
		});

		describe("without sort", function() {
			it("should return an error", function() {
				expect(function() {
					createList({
						store: {},
						fields: {}
					});
				}).toThrowError("config.sort is mandatory!");
			});
		});

		describe("without fields", function() {
			it("should return an error", function() {
				expect(function() {
					createList({
						store: {},
						sort: {}
					});
				}).toThrowError("config.fields is mandatory!");
			});
		});

		describe("without store", function() {
			it("should return an error", function() {
				expect(function() {
					createList({
						fields: {},
						sort: {}
					});
				}).toThrowError("config.store is mandatory!");
			});
		});
	});


	describe("with valid config", function() {
		var config = {
			store: store,
			fields: fields,
			sort: ["id", "name"]
		};

		var list = createList(config);

		describe("the interface should look like this:", function() {
			it("- store should be an object", function() {
				expect(typeof list.store).toBe("object");
			});

			it("- fields should be an object", function() {
				expect(typeof list.fields).toBe("object");
			});

			it("- search should be an observable", function() {
				expect(ko.isObservable(list.search)).toBe(true);
			});

			it("- sort should be an object observable", function() {
				expect(ko.isObservable(list.sort)).toBe(true);
				expect(typeof list.sort()).toBe("object");
			});

			it("- sortOptions should be an array", function() {
				expect(list.sortOptions instanceof Array).toBe(true);
			});

			it("- skip should be a number observable", function() {
				expect(ko.isObservable(list.skip)).toBe(true);
				expect(typeof list.skip()).toBe("number");
			});

			it("- limit should be a number observable", function() {
				expect(ko.isObservable(list.limit)).toBe(true);
				expect(typeof list.limit()).toBe("number");
			});

			it("- items should be an observable array", function() {
				expect(ko.isObservable(list.items)).toBe(true);
			});

			it("- count should be a read-only computed observable", function() {
				expect(ko.isComputed(list.count)).toBe(true);

				expect(function() {
					list.count("anything");
				}).toThrow("This computed variable should not be written.");
			});

			it("- loading should be a read-only computed observable", function() {
				expect(ko.isComputed(list.loading)).toBe(true);

				expect(function() {
					list.loading("anything");
				}).toThrow("This computed variable should not be written.");
			});

			it("- error should be a read-only computed observable", function() {
				expect(ko.isComputed(list.error)).toBe(true);

				expect(function() {
					list.error("anything");
				}).toThrow("This computed variable should not be written.");
			});
		});

		describe("should behave like this:", function() {
			describe("Sort", function() {
				it("should set the stores earch field properly", function(done) {
					var config = {
						store: store,
						fields: fields,
						sort: "title",
						throttle: 300,
						search: "title"
					};

					var list = createList(config);

					list.search("My beautiful knob search works ❤!");
					setTimeout(function() {
						expect(list.store.find).toEqual({
							title: "/My beautiful knob search works ❤!/gi"
						});
						done();
					}, config.throttle + 100);
				});
			});
		});
	});
});