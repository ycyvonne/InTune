import React, { Component } from "react";
import { Nav, Profile, Home } from "../";
import { Route, Switch } from "react-router-dom";
import "./Main.scss";

class Main extends Component {
  render() {
    return (
      <div>
        <Nav />
        {/*Alternate pages beneath navbar, based on current route*/}
        <Switch>
          <Route exact path="/" render={() => <Home {...this.props} />} />
          <Route path="/callback" render={() => <Profile {...this.props} />} />
        </Switch>
      </div>
    );
  }
}

export default Main;
