(function() {
// var DroneXbox = require('../DroneXbox').DroneXbox;

var module = angular.module('dronedev.dronesvc', []);

module.factory('DroneService', [function() {
	var arDrone = require('ar-drone');
		// xbox = new DroneXbox();

	var client = arDrone.createClient(),
		pngStream = client.getPngStream();

	var service = {
		client: client,
		arDrone: arDrone,
		pngStream: pngStream
	};

	return service;

}]);

})();