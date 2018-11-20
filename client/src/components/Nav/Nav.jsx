import React, { Component } from "react";
import "./Nav.scss";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { SpotifyLoginBtn, Icon } from "../";

class Nav extends Component {
  render() {
    return (
      <div className="navbar-wrapper">
        <div className="navbar">
          <div className="navbar-left">
            <Icon icon={faBars} />
            <Icon icon={faSearch} />
          </div>
          <div className="navbar-middle">INTUNE</div>
          <div className="navbar-right">
            <SpotifyLoginBtn />
          </div>
        </div>
        <div className="invisible-margin" />
      </div>
    );
  }
}

export default Nav;
