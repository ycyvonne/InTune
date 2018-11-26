import React, { Component } from "react";
import "./Nav.scss";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { SpotifyLoginBtn, Icon } from "../";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

class Nav extends Component {
  render() {
    var profileButton;
    if (
      this.props.user &&
      this.props.user.spotifyData != null &&
      this.props.user.spotifyData.isNewUser != null
    ) {
      // logged in, show profile pic
      var name = this.props.user.spotifyData.name.split(" ")[0];
      profileButton = (
        <span className="nav-profile-button-wrapper">
          <ProfilePicture
            imageUrl={this.props.user.spotifyData.img}
            customSize="nav-picture-size"
            isCircle={true}
          />
          <div className="nav-greeting">{name}</div>
        </span>
      );
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
