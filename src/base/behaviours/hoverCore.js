"use strict";

module.exports = function(dependencies){
	if(!dependencies) {
		throw new Error("dependencies is mandatory!");
	}

	if(!dependencies.ko) {
		throw new Error("dependencies.ko is mandatory!");
	}

	var ko = dependencies.ko;

	return function hoverBehaviour(vm) {
		if (!vm) {
			throw new Error("vm is mandatory!");
		}

		if (!ko.isObservable(vm.state)) {
			throw new Error("vm.state has to be a knockout observable!");
		}

		var previousState;

		function mouseOver() {
			var actState = vm.state();

			if (actState === "disabled" || actState === "active" || actState === "hover") {
				return;
			}

			if (actState !== "hover") {
				previousState = actState;
			}

			vm.state("hover");
		}

		function mouseOut() {
			var actState = vm.state();

			if (actState === "disabled" || actState === "active") {
				return;
			}

			vm.state(previousState);
		}

		if (!vm.eventHandlers) {
			vm.eventHandlers = {};
		}

		vm.eventHandlers.mouseover = mouseOver;
		vm.eventHandlers.mouseout = mouseOut;

		return vm;
	};
};