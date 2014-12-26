angular.module('dronedev.dronesvc', [])
.factory('DroneService', [function() {
	var arDrone = require('ar-drone');
	var client = arDrone.createClient(),
		pngStream = client.getPngStream();

	return {
		client: client,
		arDrone: arDrone,
		pngStream: pngStream
	};
}]);