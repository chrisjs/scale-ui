import React, { Component } from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph";

class App extends Component {
    constructor() {
        super();
        this.state = {
            seo_title: "",
            scale_settings: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        const { seo_title } = this.state;
        const { scale_settings } = this.state;
        this.setup();
        return (
            <form id="article-form">
                <Graph
                    text="SEO title"
                    label="seo_title"
                    type="text"
                    id="seo_title"
                    scale_settings={scale_settings}
                    value={seo_title}
                    handleChange={this.handleChange}
                />
            </form>
        );
    }

    setup() {
        const that = this;
        // Create WebSocket connection.
        const socket = new WebSocket('ws://localhost:3000/data');
        console.log('socket');

        // Connection opened
        socket.addEventListener('open', function (event) {
            let msg = Object();
            msg.cmd = 'hello';
            socket.send(JSON.stringify(msg));  // why this required??!!
            console.log('got open');
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
            const dat = JSON.parse(event.data);
            that.setState({ scale_settings: dat });
        });

    }
}

export default App;

const wrapper = document.getElementById("web-ui");
wrapper ? ReactDOM.render(<App />, wrapper) : false;