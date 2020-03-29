import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";
// pages for this product
import ComponentPage from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/components" component={ComponentPage}/>
            <Route path="/profile-page" component={ProfilePage}/>
            <Route path="/login-page" component={LoginPage}/>
            <Route path="/" component={LandingPage}/>
        </Switch>
    </Router>,
    document.getElementById("root")
);
