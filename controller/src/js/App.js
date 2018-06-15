import React, { Component } from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph";

class App extends Component {
    constructor() {
        super();
        this.state = {
            scale_settings: []
        };
    }
    render() {
        const { scale_settings } = this.state;
        this.setup();

        return (
            <div>
                <Graph
                    scale_settings={scale_settings}
                />
            </div>
        );
    }

    setup() {
        // Maintain the proper reference to this instance
        const that = this;

        // Create WebSocket connection.
        const socket = new WebSocket('ws://192.168.4.1:3000/data');

        // Connection opened
        socket.addEventListener('open', function (event) {
            let msg = Object();
            msg.cmd = 'hello';
            socket.send(JSON.stringify(msg));  // why this required??!!
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            const dat = JSON.parse(event.data);
            that.setState({ scale_settings: dat });
        });

    }
}

export default App;

const wrapper = document.getElementById("web-ui");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
