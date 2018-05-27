
# Equine Scale Web UI

The purpose of this project is to visually display data regarding the weight of a horse.
This particular component within the project focuses on the user experience - also known as the Web UI.


The Web UI consists of two parts:
 * A simulator, which pushes messages from a sample file onto the MQTT topics
 * A controller, which reads message from the topics, and forwards them to a Browser via a socket

## Prerequisites

The Scale Web UI assumes that an MQTT server is available. It's possible to run one within docker.


Example:
`docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto`


## Simulator

The simulator is written Python and assumes python 2.7.x is installed. To start the simulator:

 * Verify that the MQTT server is running
 * Navigate to the `simulator` directory, and type `python simulator.py`

When a message is processed, output should display in the console.


## Controller
The controller uses a combination of Node and ReactJS to listen for MQTT scale data, and send it to the browser via a Web Socket.

To start the controller:
 * Verify that the MQTT server is running
 * Navigate to the `controller` directory
 * If this is the first time running the controller, type `npm install`
 * Run `npm start`
 * Launch a web browser and navigate to http://localhost:3000/


Future considerations for the controller:
 * accept command messages on WS to record/stop/playback recorded session data
 * manage recorded sessions, with mongodb
 * downsample playback data, as needed to display in web UI

Sample data record:

```
{
    "timestamp": "1522382579.1",
    "2": {
        "high_byte": 5,
        "weight": "1280.6",
        "low_byte": 6
    },
    "3": {
        "high_byte": 7,
        "weight": "1792.8",
        "low_byte": 8
    },
    "4": {
        "high_byte": 9,
        "weight": "2305.0",
        "low_byte": 10
    },
    "1": {
        "high_byte": 3,
        "weight": "768.4",
        "low_byte": 4
    }
}
```

Values received in data record:

 * timestamp -- system timestamp in fractional seconds, when data sample received at Raspi.
 * scale id [1-4] -- ID# of scale.
 * {low,high}_byte -- raw bytes received from microcontroller reading HX711 scale sensor chip (bytes for diagnosis only).
 * weight -- weight in KG of load on scale.


