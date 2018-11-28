import React, { Component } from "react";
import { Nav, ProfilePage, HomePage, ConcertPage, ConcertInfoPage } from "../";
import { Route, Switch } from "react-router-dom";
import "./Main.scss";

class Main extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.props.getLoggedInUser();
  }

  render() {
    var callbackComponent;
    if (
      this.props.user.spotifyData != null &&
      !this.props.user.spotifyData.isNewUser
    ) {
      // login, not new user
      callbackComponent = <HomePage {...this.props} />;
    } else {
      // create, new user
      callbackComponent = <ProfilePage {...this.props} />;
    }
    return (
      <div>
        <Nav {...this.props} />
        {/*Alternate pages beneath navbar, based on current route*/}
        <Switch>
          <Route exact path="/" render={() => <HomePage {...this.props} />} />
          <Route path="/callback" render={() => callbackComponent} />
          <Route
            path="/concerts"
            render={() => <ConcertPage {...this.props} />}
          />
          <Route path="/concert/:id" render={({match}) => <ConcertInfoPage concertId={match.params.id} {...this.props}/>} />
        </Switch>
      </div>
    );
  }
}

export default Main;
