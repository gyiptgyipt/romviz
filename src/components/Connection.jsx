import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import ROSLIB from "roslib";

class Connection extends Component {
    state = { connected: false };

    constructor() {
        super();
        this.ros = null; // Initialize ROS connection instance
        this.init_connection();
    }

    init_connection() {
        // Initialize the ROS connection
        this.ros = new ROSLIB.Ros({
            url: "ws://localhost:9090", // Update this with your ROS 2 WebSocket server URL
        });

        // Define ROS connection events
        this.ros.on("connection", () => {
            console.log("Connection to ROS 2 established!");
            this.setState({ connected: true });
        });

        this.ros.on("error", (error) => {
            console.error("Error connecting to ROS 2:", error);
            this.setState({ connected: false });
        });

        this.ros.on("close", () => {
            console.log("Connection to ROS 2 closed.");
            this.setState({ connected: false });
        });
    }

    render() {
        return (
            <div>
                <Alert className="text-center m-3" variant={this.state.connected ? "success" : "danger"}>
                    {this.state.connected ? "ROBOT CONNECTED" : "ROBOT DISCONNECTED"}
                </Alert>
            </div>
        );
    }
}

export default Connection;
