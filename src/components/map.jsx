import React, { Component } from "react";
import ROSLIB from "roslib";
// import Config from "../script/config";
import * as ROS2D from "ros2d";

class Map extends Component {
  state = { connected: false }; // Initialize state

  constructor() {
    super();
    this.ros = null; // Initialize ROS connection instance
    this.view_map = this.view_map.bind(this);
    this._isMounted = false; // Added to track mounting status
  }

  componentDidMount() {
    this._isMounted = true; // Set flag to true when component is mounted
    this.init_connection();
    this.view_map();
  }

  componentWillUnmount() {
    this._isMounted = false; // Set flag to false when component is unmounted
  }

  init_connection() {
    // Initialize the ROS connection
    this.ros = new ROSLIB.Ros({
      url: "ws://localhost:9090", // Update this with your ROS 2 WebSocket server URL
    });

    // Define ROS connection events
    this.ros.on("connection", () => {
      console.log("Connection to ROS 2 established in Map!");
      if (this._isMounted) {
        this.setState({ connected: true }); // Set state when connection is successful
      }
    });

    this.ros.on("error", (error) => {
      console.error("Error connecting to ROS 2:", error);
      if (this._isMounted) {
        this.setState({ connected: false }); // Set state when connection has an error
      }
    });

    this.ros.on("close", () => {
      console.log("Connection to ROS 2 closed.");
      if (this._isMounted) {
        this.setState({ connected: false }); // Set state when connection is closed
      }
    });
  }

  view_map() {
    var viewer = new ROS2D.Viewer({
      divID: "nav_div",
      width: 640,
      height: 480,
    });

    var gridClient = new ROS2D.OccupancyGridClient({
      ros : this.ros,
      rootObject : viewer.scene
    });
    // Scale the canvas to fit to the map
    gridClient.on('change', function(){
      viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    });
  }

  render() {
    return <div id="nav_div"> </div>;
  }
}

export default Map;
