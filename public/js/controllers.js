angular.module('dronedev.controllers', [])
.controller('IOController', ['$scope', 'DroneService', '$interval', function($scope, DroneService, $interval) {

	$scope.keyName = "None";
	$scope.navData = null;
	var stream = DroneService.pngStream;

	stream.on('data', function(data) {
		var blob = new Blob([data], {type: 'image/png'});
		var url = URL.createObjectURL(blob);
		var img = new Image;

		img.onload = function() {
			var ctx = document.getElementById("canvas").getContext("2d");
			ctx.drawImage(this, 0, 0);
			URL.revokeObjectURL(url);
		};

		img.src = url;

		// console.log("Got data from pngstream, ", data);
	});

	DroneService.client.on('navdata', function(data) {
		$scope.navData = data;
		console.log(data);

		if (data.hasOwnProperty('demo')) {
			$scope.battery = data.demo.batteryPercentage;
		}
	});

	$scope.UP = function() {
		DroneService.client.up(0.2);
		$scope.keyName = "up";
		console.log("We rollin up");
	};

	$scope.DOWN = function() {
		DroneService.client.down(0.4);
		$scope.keyName = "down";
	};

	$scope.ROLLLEFT = function() {
		DroneService.client.left(0.4);
		$scope.keyName = "left";
	};

	$scope.ROLLRIGHT = function() {
		DroneService.client.right(0.4);
		$scope.keyName = "right";
	};

	$scope.ROLLFRONT = function() {
		DroneService.client.front(0.4);
		$scope.keyName = "roll front";
	};

	$scope.ROLLBACK = function() {
		DroneService.client.back(0.4);
		$scope.keyName = "roll back";
	};

	$scope.YAWRIGHT = function() {
		DroneService.client.clockwise(1);
		$scope.keyName = "yaw right (no rly)";
	};

	$scope.YAWLEFT = function() {
		DroneService.client.counterClockwise(1);
		$scope.keyName = "yaw left";
	};

	$scope.STOP = function() {
		DroneService.client.stop();
		$scope.keyName = "Stopped";
	};

	$scope.RELEASED = function() {
		DroneService.client.stop();
		$scope.keyName = "Stopped";
	};

	var keyMap = {
		38: $scope.ROLLFRONT,	// Roll forward
		40: $scope.ROLLBACK, // Roll backward
		37: $scope.YAWLEFT, // spin Left
		39: $scope.YAWRIGHT, // spin Right,
		65: $scope.ROLLLEFT, // roll left
		68: $scope.ROLLRIGHT, // roll right
		87: $scope.UP, 		// Ascend
		83: $scope.DOWN, 	// Descend
		0: $scope.RELEASED,
		32: $scope.STOP
	};

	$scope.key = 0;

	$scope.keyEvent = function($event) {
		if ($event.keyCode in keyMap && $event.keyCode !== $scope.key) {

			$scope.key = $event.keyCode;

			keyMap[$event.keyCode]();
		}
	};

	$scope.keyUpEvent = function($event) {
		$scope.key = 0
		keyMap[$scope.key]();
		$scope.keyName = 'Stopped';
	};

	$scope.takeoff = function() {
		DroneService.client.takeoff();

		// $scope.batteryCheckPromise = $interval(function() {
		// 	$scope.battery = DroneService.client._lastBattery;
		// }, 1000);
		
	};

	$scope.land = function() {
		console.log(DroneService.client.land());
		$interval.cancel($scope.batteryCheckPromise);
	};

	// $scope.navDataIn = function(data) {
	// 	console.log(data);
	// 	$scope.navData = data;
	// };

	


}]);