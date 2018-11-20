import React, { Component } from "react";
import { SpotifyLoginBtn, Splash, Card } from "../";
import "./Home.scss";

class Home extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <Splash
          customClass="home-splash"
          subheading="Welcome to"
          heading="InTune"
          subtitle="MATCH YOU WITH YOUR MUSIC TASTE"
        />
        <div className="mask">
          <div className="cards-container">
            <Card
              imgUrl="/img/concerts-card.png"
              text="
              
              Match you with concerts"
            />
            <Card
              imgUrl="/img/friends-card.png"
              text="
              
              Friends with same music taste"
            />
            <Card
              imgUrl="/img/artists-card.png"
              text="
              
              Meet your favorite artist"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
