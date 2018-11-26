import React, { Component } from "react";
import { Nav, Profile, Home } from "../";
import { Route, Switch } from "react-router-dom";
import "./Main.scss";

class Main extends Component {
  render() {
    var callbackComponent;
    if (
      this.props.user.spotifyData != null &&
      !this.props.user.spotifyData.isNewUser
    ) {
      // login, not new user
      callbackComponent = <Home {...this.props} />;
    } else {
      // create, new user
      callbackComponent = <Profile {...this.props} />;
    }
    return (
      <div>
        <Nav />
        {/*Alternate pages beneath navbar, based on current route*/}
        <Switch>
          <Route exact path="/" render={() => <Home {...this.props} />} />
          <Route path="/callback" render={() => callbackComponent} />
        </Switch>
      </div>
    );
  }
}

export default Main;
