import React, { Component } from "react";
import { SpotifyLoginBtn, Splash } from "../";
import "./Home.scss";

class Home extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <SpotifyLoginBtn {...this.props} />
        <Splash
          customClass="home-splash"
          subheading="Welcome to"
          heading="InTune"
          subtitle="MATCH YOU WITH YOUR MUSIC TASTE"
        />
        <div>Other content</div>
      </div>
    );
  }
}

export default Home;
