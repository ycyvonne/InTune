import React, { Component } from "react";
import { Nav, Profile, Login } from "../";
import { Route, Switch } from "react-router-dom";
import MatchPage from "../MatchPage/MatchPage";

class Main extends Component {
  render() {
    return (
      <div>
        <Nav />
        {/*Alternate pages beneath navbar, based on current route*/}
        <Switch>
          <Route
            exact
            path="/"
            render={() => <MatchPage />}
          />
          <Route path="/callback" render={() => <Profile {...this.props} />} />
        </Switch>
      </div>
    );
  }
}

export default Main;
