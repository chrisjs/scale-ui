
var path = require('path');
var mqtt = require('mqtt');
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

var sock = null;

/**
 * MQTT connect and subscribe for records
 */

var mqtt = require('mqtt');
//var mq  = mqtt.connect('mqtt://test.mosquitto.org');
var mq  = mqtt.connect('mqtt://localhost');

mq.on('connect', function () {
  mq.subscribe('scale/records');
  mq.subscribe('scale/system');
  //mq.publish('scale/system', 'Hello');
  //mq.publish('scale/records', 'Hello mqtt');
});

mq.on('message', function (topic, message) {
	// message is Buffer
	var msg = message.toString();
	if(topic === 'scale/system') {
		console.log('system: '+ msg);
	}
	else if(topic === 'scale/records') {
		//console.log('record: '+ msg);
 		rec = JSON.parse(message.toString('utf8'));
		//console.log('record: ts= '+ rec.timestamp);
        // make WS live data message 
		uimsg = [rec.timestamp,
            rec[1].weight,
            rec[2].weight,
            rec[3].weight,
            rec[4].weight
        ];
		console.log('uimsg= '+ uimsg);

        // send records data to UI client
        if (sock) {
            sock.send( JSON.stringify(uimsg) );
        }

    }

  //mq.end();
});


/**
 * Web Socket
 */

app.ws('/data', (ws, req) => {
    ws.on('connect', () => {
        console.log('ws connect');
    });
    ws.on('open', () => {
        console.log('ws open');
    });
    ws.on('message', msgstring => {
        console.log('ws message: '+msgstring);
        command = JSON.parse(msgstring.toString());
        console.log('ws got cmd: '+command.cmd);
        if (command.cmd === 'startRecording') {
            console.log('TODO: start mongo controller recording data');
        }
        else if (command.cmd === 'stopRecording') {
            console.log('TODO: stop mongo controller recording data');
        }
        else if (command.cmd === 'querySessionList') {
            console.log('TODO: query for list of sessions stored in mongo');
        }
        else if (command.cmd === 'querySession') {
            console.log('TODO: query session data stored in mongo');
        }
        else if (command.cmd === 'updateSession') {
            console.log('TODO: update session: to change session name');
        }
        else if (command.cmd === 'deleteSession') {
            console.log('TODO: delete session: to remove session and data');
        }
        sock = ws;
        sock.send(msgstring);
        //ws.send(msgstring);
    });
    ws.on('close', () => {
        console.log('ws close');
        sock = null;
    });
});



/**
 * EXPRESS app and pages
 */
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});
 
app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});
 
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log('ws msg: '+msg);
  });
  console.log('socket', req.testing);
});
 
app.listen(3000);

