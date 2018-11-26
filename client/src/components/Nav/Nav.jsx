import React, { Component } from "react";
import "./Nav.scss";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { SpotifyLoginBtn, Icon } from "../";

class Nav extends Component {
  render() {
    var profileButton;
    console.log(this.props.user);
    if (
      this.props.user &&
      this.props.user.spotifyData != null &&
      this.props.user.spotifyData.isNewUser != null
    ) {
      // logged in, show profile pic
      profileButton = <img src={this.props.user.spotifyData.img} />;
    } else {
      // not logged in
      profileButton = <SpotifyLoginBtn />;
    }

    return (
      <div className="navbar-wrapper">
        <div className="navbar">
          <div className="navbar-left">
            <Icon icon={faBars} />
            <Icon icon={faSearch} />
          </div>
          <div className="navbar-middle">INTUNE</div>
          <div className="navbar-right">{profileButton}</div>
        </div>
        <div className="invisible-margin" />
      </div>
    );
  }
}

export default Nav;
