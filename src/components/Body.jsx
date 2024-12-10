import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route , BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";

class Body extends Component {

    render() {
        return (
        <Container>
            <Router>
                <Switch>
                    <Route path="/" Component={Home}></Route>
                    <Route path="/link" exact Component={About}></Route>


                </Switch>


            </Router>
        </Container>
             );
    }
}

export default Body;