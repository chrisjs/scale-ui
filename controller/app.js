
// var http = require('http');
var app = require('express');
var ws = require('express-ws')(app);

/**
 * MQTT connect and echo to WS
 */
var mqtt = require('mqtt');
//var client  = mqtt.connect('mqtt://test.mosquitto.org');
var client  = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
    console.log('connected');
  client.subscribe('scale/records');
  client.publish('scale/records', 'Hello mqtt');
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('Message: '+message.toString());
  // TODO echo message to ws
  //client.end();
});


