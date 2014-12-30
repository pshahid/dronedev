var arDrone = require('ar-drone');
var client = arDrone.createClient();
var ffmpeg = require('fluent-ffmpeg');
var XboxController = require('xbox-controller'),
	xbox = new XboxController('Afterglow Gamepad for Xbox 360');


// console.log(HID.devices());

var lastRight = {};
var lastLeft = {};

xbox.on('a:press', function (key) {
		console.log(key + ' press');
});

xbox.on('b:press', function (key) {
		console.log(key + ' press');
});

xbox.on('left:move', function(position){
	if (lastLeft.x !== position.x || lastLeft.y !== position.y) {
		console.log('left:move', position);
		lastLeft = position;
	}
});

xbox.on('right:move', function(position){
	if (lastRight.x !== position.x || lastRight.y !== position.y) {
		console.log('right:move', position);	
		lastRight = position;
	}
});

function leftMove(position) {
	if (position.y > 0) {
		// left stick moved down
	} else if (position.y < 0) {
		// left stick moved up
	}

	if (position.x > 0) {
		// left stick moved right
	} else if (position.x < 0) {
		// left stick moved left

	}
}

function rightMove(position) {
	if (position.y > 0) {
		// left stick moved down
	} else if (position.y < 0) {
		// left stick moved up
	}

	if (position.x > 0) {
		// left stick moved right
	} else if (position.x < 0) {
		// left stick moved left

	}
}

client.createRepl();