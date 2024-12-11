import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import Get_Help from "./Get_Help";

class Body extends Component {
    render() {
        return (
            <Container>
                <Router>
                    <Switch>
                        <Route path="/home" exact component={Home} />
                        <Route path="/link" exact component={Get_Help} /> 
                        {/* get help  */}
                    </Switch>
                </Router>
            </Container>
        );
    }
}

export default Body;
