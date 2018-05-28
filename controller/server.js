require('dotenv').config()
const path = require('path');
const mqtt = require('mqtt');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const winston = require('winston');
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true
        })
    ]
});
logger.level = process.env.LOG_LEVEL;

var sock = null;

/**
 * MQTT connect and subscribe for records
 */

var mq = mqtt.connect('mqtt://' + process.env.MQTT_SERVER);

mq.on('connect', function () {
    mq.subscribe('scale/records');
    mq.subscribe('scale/system');
    logger.debug("Connected to the MQTT server");
});

mq.on('message', function (topic, message) {

    // message is Buffer
    var msg = message.toString();
    if (topic === 'scale/system') {
        logger.info('system: ' + msg);
    } else if (topic === 'scale/records') {
        try {
            logger.debug('record: ' + msg);
            rec = JSON.parse(message.toString('utf8'));

            // make WS live data message 
            let uiObj = [
                rec.timestamp,
                rec[1].weight,
                rec[2].weight,
                rec[3].weight,
                rec[4].weight
            ];

            let uiMsg = JSON.stringify(uiObj);
            logger.debug('uimsg= ' + uiMsg);

            // send records data to UI client
            if (sock) {
                sock.send(uiMsg);
                logger.debug('sent');
            } else {
                logger.debug("Socket is null");
            }
        } catch (mqttErr) {
            logger.error("Error sending message: " + JSON.stringify(mqttErr));
        }

    }

    //mq.end();
});


/**
 * Web Socket
 */

app.ws('/data', function (ws, req) {
    ws.on('connect', function () {
        logger.debug('ws connect');
    });
    ws.on('open', function () {
        logger.debug('ws open');
    });
    ws.on('message', function (msgstring) {
        logger.info('ws message: ' + msgstring);
        command = JSON.parse(msgstring.toString());
        logger.info('ws got cmd: ' + command.cmd);
        if (command.cmd === 'startRecording') {
            logger.silly('TODO: start mongo controller recording data');
        }
        else if (command.cmd === 'stopRecording') {
            logger.silly('TODO: stop mongo controller recording data');
        }
        else if (command.cmd === 'querySessionList') {
            logger.silly('TODO: query for list of sessions stored in mongo');
        }
        else if (command.cmd === 'querySession') {
            logger.silly('TODO: query session data stored in mongo');
        }
        else if (command.cmd === 'updateSession') {
            logger.silly('TODO: update session: to change session name');
        }
        else if (command.cmd === 'deleteSession') {
            logger.silly('TODO: delete session: to remove session and data');
        }
        if (sock == null) {
            sock = ws;
        }
    });

    ws.on('close', function () {
        logger.info('ws close');
        sock = null;
    });

});




/**
 * EXPRESS app and pages
 */
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.use(function (req, res, next) {
    logger.info('middleware');
    req.testing = 'testing';
    return next();
});

app.get('/', function (req, res, next) {
    logger.debug('get route', req.testing);
    res.end();
});

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        logger.debug('ws msg: ' + msg);
    });
    logger.info('socket', req.testing);
});

app.listen(process.env.LISTEN_PORT);

