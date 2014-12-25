angular.module('dronedev.controllers', [])
.controller('IOController', ['$scope', 'DroneService', function($scope, DroneService) {

	$scope.keyName = "None";

	$scope.UP = function() {
		DroneService.client.front(0.1);
		$scope.keyName = "up";
	};

	$scope.DOWN = function() {
		DroneService.client.back(0.1);
		$scope.keyName = "down";
	};

	$scope.LEFT = function() {
		DroneService.client.left(0.1);
		$scope.keyName = "left";
	};

	$scope.RIGHT = function() {
		DroneService.client.right(0.1);
		$scope.keyName = "right";
	};

	$scope.RELEASED = function() {
		DroneService.client.stop();
		$scope.keyName = "none";
	};

	var keyMap = {
		38: $scope.UP,	// Up
		40: $scope.DOWN, // Down
		37: $scope.LEFT, // Left
		39: $scope.RIGHT, // Right
		0: $scope.RELEASED
	};

	$scope.key = 0;

	$scope.keyEvent = function($event) {
		$scope.key = $event.keyCode;

		if (keyMap.hasOwnProperty($scope.key)) {
			keyMap[$scope.key]();
		}
	};

	$scope.keyUpEvent = function($event) {
		$scope.key = 0
		keyMap[$scope.key]();
	};

	$scope.takeoff = function() {
		DroneService.client.takeoff();
	};

	$scope.land = function() {
		console.log(DroneService.client.land());
	}


}]);