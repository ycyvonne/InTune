import React, { Component } from "react";
import "./Nav.scss";
import { faBars, faSearch, faMusic } from "@fortawesome/free-solid-svg-icons";
import { SpotifyLoginBtn, Icon } from "../../";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

class Nav extends Component {
  render() {
    var loginDependentComponents;
    if (
      this.props.user &&
      this.props.user.spotifyData != null &&
      this.props.user.spotifyData.isNewUser != null
    ) {
      // logged in, show profile pic
      loginDependentComponents = (
        <span className="nav-profile-button-wrapper">
          <Icon icon={faMusic} />
          <ProfilePicture
            imageUrl={this.props.user.spotifyData.img}
            customSize="nav-picture-size"
            isCircle={true}
          />
        </span>
      );
    } else {
      // not logged in
      loginDependentComponents = <SpotifyLoginBtn />;
    }

    return (
      <div className="navbar-wrapper">
        <div className="navbar">
          <div className="navbar-inner">
          <div className="navbar-left">
              <h3>intune</h3>
            </div>
            <div className="navbar-middle">
              <div className="navbar-link">MATCHES</div>
              <div className="navbar-link">CONCERTS</div>
            </div>
            <div className="navbar-right">
              <Icon icon={faSearch} />
              {loginDependentComponents}
            </div>
          </div>
        </div>
        <div className="invisible-margin" />
      </div>
    );
  }
}

export default Nav;
