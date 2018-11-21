import React, { Component } from "react";
import { Input } from "../";
import "./ProfilePicture.scss";

class ProfilePicture extends Component {
  render() {
    return (
      <div className="profile-picture-wrapper">
        <div className="profile-picture-heading">PROFILE PICTURE</div>
        <div className="person-card">
          <label className="profile-container" htmlFor="profile-image-input">
            <img
              className="profile-picture"
              src={this.props.user.spotifyData.img}
            />
            <div id="overlay">
              <div>Upload!</div>
            </div>
          </label>
          <Input customId="profile-image-input" customType="file" />
        </div>
      </div>
    );
  }
}

export default ProfilePicture;
