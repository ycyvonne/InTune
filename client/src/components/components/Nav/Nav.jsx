import React, { Component } from "react";
import "./Nav.scss";
import { faBars, faSearch, faMusic } from "@fortawesome/free-solid-svg-icons";
import { SpotifyLoginBtn, Icon } from "../../";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

class Nav extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.getIsActive = this.getIsActive.bind(this);
    this.state = {
      isActive: this.getIsActive()
    }
  }

  getIsActive() {
    var links = ["/matches", "/concerts"];
    var isActive = {
      "/matches": false,
      "/concerts": false
    }
    if (links.includes(this.props.path)) {
      isActive[this.props.path] = true;
    }
    return isActive;
  }

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
          <div className="navbar-link">
            <Icon icon={faMusic} />
          </div>
          <div className="navbar-link">
            <ProfilePicture
              hasMenu={true}
              imageUrl={this.props.user.spotifyData.img}
              customSize="nav-picture-size"
              isCircle={true}
            />
          </div>
        </span>
      );
    } else {
      // not logged in
      loginDependentComponents = <div className="navbar-link"><SpotifyLoginBtn /></div>;
    }

    return (
      <div className="navbar-wrapper">
        <div className="navbar">
          <div className="navbar-inner">
          <div className="navbar-left">
              <a href="#" className="navbar-link"><Icon icon={faBars} /></a>
              <a href="/" className="navbar-link"><h3>intune</h3></a>
            </div>
            <div className="navbar-middle">
              <a href="/matches" className="navbar-link"><div className={this.state.isActive["/matches"] ? "active" : ""}>MATCHES</div></a>
              <a href="/concerts" className="navbar-link"><div className={this.state.isActive["/concerts"] ? "active" : ""}>CONCERTS</div></a>
            </div>
            <div className="navbar-right">
              <div className="navbar-link"><Icon icon={faSearch} /></div>
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
