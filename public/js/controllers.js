angular.module('dronedev.controllers', [])
.controller('IOController', ['$scope', 'DroneService', '$interval', function($scope, DroneService, $interval) {

	$scope.keyName = "None";
	$scope.navData = null;

	DroneService.client.ftrim();

	var stream = DroneService.pngStream,
		imgPrefix = 'data:image/png;base64,';
		// derp = require('myxbox');

	// xbox.on('a:press', function (key) {
 //  		console.log(key + ' press');
	// });

	// xbox.on('a:press', function (key) {
 //  		console.log(key + ' press');
	// });

	// xbox.on('left:move', function(position){
	// 	console.log('left:move', position);
	// });

	// xbox.on('right:move', function(position){
	// 	console.log('right:move', position);
	// });

	stream.on('data', function(data) {
		var url = imgPrefix + data.toString('base64');
		var img = document.getElementById('mainImg');
		var ctx = document.getElementById("canvas").getContext("2d");
		
		img.onload = function() {
			ctx.drawImage(this, 0, 0);
			URL.revokeObjectURL(url);
		};

		img.src=url;
	});

	DroneService.client.on('navdata', function(data) {
		$scope.navData = data;

		if (data.hasOwnProperty('demo')) {
			$scope.battery = data.demo.batteryPercentage;
		}
	});

	$scope.UP = function() {
		DroneService.client.up(1);
		$scope.keyName = "up";
	};

	$scope.DOWN = function() {
		DroneService.client.down(1);
		$scope.keyName = "down";
	};

	$scope.ROLLLEFT = function() {
		DroneService.client.left(1);
		$scope.keyName = "left";
	};

	$scope.ROLLRIGHT = function() {
		DroneService.client.right(1);
		$scope.keyName = "right";
	};

	$scope.ROLLFRONT = function() {
		DroneService.client.front(1);
		$scope.keyName = "roll front";
	};

	$scope.ROLLBACK = function() {
		DroneService.client.back(1);
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
	};

	$scope.land = function() {
		DroneService.client.land();
		$interval.cancel($scope.batteryCheckPromise);
	};

}]);