import React, { Component } from "react";
import { Input } from "../";
import "./ProfileColumn2.scss";

class ProfileColumn2 extends Component {
  render() {
    return (
      <div className="profile-wrapper column">
        <div className="column">
          <Input title="FULL NAME" customClass="profile-title" type="text" />
          <Input title="USERNAME" customClass="profile-title" type="text" />
          <Input
            title="SPOTIFY ACCOUNT"
            customClass="profile-title"
            type="text"
          />
          <Input
            title="FAVORITE ARTIST"
            customClass="profile-title"
            type="text"
          />
        </div>
        <div className="column">
          <Input title="EMAIL" customClass="profile-title" type="text" />
          <Input title="PASSWORD" customClass="profile-title" type="text" />
          <Input title="LOCATION" customClass="profile-title" type="text" />
        </div>
      </div>
    );
  }
}

export default ProfileColumn2;
