var arDrone = require('ar-drone');
var client = arDrone.createClient();
var XboxController = require('xbox-controller'),
	xbox = new XboxController('Afterglow Gamepad for Xbox 360');


// console.log(HID.devices());

var lastRight = {};
var lastLeft = {};
var MAX_STICK_INTEGER = 32767;

client.ftrim();

xbox.on('a:press', function (key) {
	client.takeoff();
});

xbox.on('b:press', function (key) {
	client.land();
});

xbox.on('x:press', function(key) {
	client.up(1.0);
});

xbox.on('x:release', function(key) {
	maintainElevation();
});

xbox.on('y:press', function(key) {
	client.down(1.0);
});

xbox.on('y:release', function(key) {
	maintainElevation();
});



xbox.on('left:move', function(position){
	if (lastLeft.x !== position.x || lastLeft.y !== position.y) {
		console.log('left:move', position);
		lastLeft = position;

		if (position.x === 0 && position.y === 0) {
			stopRolling();
		} else {
			leftMove(position);
		}
		
	}

});

xbox.on('right:move', function(position){
	if (lastRight.x !== position.x || lastRight.y !== position.y) {
		console.log('right:move', position);	
		lastRight = position;

		if (position.x === 0 && position.y === 0) {
			stopSpinning();
			stopForwardAndBack();
		} else {
			rightMove(position);
		}
		
	}


});

function roundToTwo(num) {
	return Math.round(num * 100) / 100;
}

function stopSpinning() {
	client.clockwise(0);
	client.counterClockwise(0);
}

function stopRolling() {
	client.left(0);
	client.right(0);
}

function maintainElevation() {
	client.up(0);
	client.down(0);
}

function stopForwardAndBack() {
	client.front(0);
	client.back(0);
}

function leftMove(position) {
	if (position.y > 0) {
		// left stick moved down


	} else if (position.y < 0) {
		// left stick moved up
	}

	if (position.x > 0) {
		// left stick moved right

		client.right( roundToTwo( position.x / MAX_STICK_INTEGER ) );
	} else if (position.x < 0) {
		// left stick moved left
		client.left( roundToTwo ( (-1 * position.x) / MAX_STICK_INTEGER ) );
	}
}

function rightMove(position) {
	if (position.y > 0) {
		// right stick moved down

		client.back( roundToTwo( position.y / MAX_STICK_INTEGER ) );

	} else if (position.y < 0) {
		// right stick moved up

		client.front( roundToTwo( (-1 * position.y) / MAX_STICK_INTEGER ) );
	}

	if (position.x > 0) {
		// right stick moved right

		client.clockwise( roundToTwo( position.x / MAX_STICK_INTEGER ) );

	} else if (position.x < 0) {
		// right stick moved left

		client.counterClockwise( roundToTwo( (-1 * position.x) / MAX_STICK_INTEGER ) );

	}
}

client.createRepl();