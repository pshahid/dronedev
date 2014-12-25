angular.module('dronedev.dronesvc', [])
.factory('DroneService', [function() {
	var arDrone = require('ar-drone');
	var client = arDrone.createClient();

	return {
		client: client,
		arDrone: arDrone
	};
}]);