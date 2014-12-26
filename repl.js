var arDrone = require('ar-drone');
var client = arDrone.createClient();
var ffmpeg = require('fluent-ffmpeg');

client.createRepl();