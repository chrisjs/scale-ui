
# Equine Scale Web UI

The controller uses node.js to listen to MQTT scale data, and send to Web Socket (WS) for UI.

Other things that might happen in this controller:

    * accept command messages on WS to record/stop/playback recorded session data
    * manage recorded sessions, with mongodb
    * downsample playback data, as needed to display in web UI

Sample of data record:

    ```
    { "timestamp": "1522382579.1",
    "2": {"high_byte": 5, "weight": "1280.6", "low_byte": 6},
    "3": {"high_byte": 7, "weight": "1792.8", "low_byte": 8},
    "4": {"high_byte": 9, "weight": "2305.0", "low_byte": 10},
    "1": {"high_byte": 3, "weight": "768.4", "low_byte": 4} }
    ```

Values received in data record:

      * timestamp -- system timestamp in fractional seconds, when data sample received at Raspi.
      * scale id [1-4] -- ID# of scale.
      * {low,high}_byte -- raw bytes received from microcontroller reading HX711 scale sensor chip (bytes for diagnosis only).
      * weight -- weight in KG of load on scale.


