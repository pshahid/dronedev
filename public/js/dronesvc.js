angular.module('dronedev.dronesvc', [])
.factory('DroneService', [function() {
	var arDrone = require('ar-drone');

	// console.log(__dirname);

	var client = arDrone.createClient(),
		// PaVEParser = require('ar-drone/lib/video/PaVEParser'),
		// video = client.getVideoStream(),
		// output = require('fs').createWriteStream('public/vid2.mp4'),
		pngStream = client.getPngStream();

	// var parser = new PaVEParser();

	var service = {
		client: client,
		arDrone: arDrone,
		pngStream: pngStream
		// video: video,
		// parser: parser
	};

	// parser.on('data', function(data) {
	// 	// output.write(data.payload);
	// 	// videoEncoder.write(data.payload);
	// 	// service.encodeVideo(data.payload);
	// })
	// .on('end', function() {
	// 	console.log("Shit's done yo");
	// });

	// video.pipe(parser);


	return service;

}]);