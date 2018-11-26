import React, { Component } from "react";
import { Input } from "../";
import "./ProfilePicture.scss";

// TODO: After profile page is reconnected to backend
// Refactor <div className="person-card" /> to use <ImageCard />

class ProfilePicture extends Component {
  render() {
    var personCard;
    if (this.props.isInput) {
      personCard = (
        <div className="person-card">
          <label className="profile-container" htmlFor="profile-image-input">
            <img
              className={`profile-picture ${this.props.customSize}`}
              src={this.props.imageUrl}
            />
            <div id="overlay">
              <div>Upload!</div>
            </div>
          </label>
          <Input customId="profile-image-input" customType="file" />
        </div>
      );
    } else {
      personCard = (
        <div className="person-card">
          <label className="profile-container">
            <img
              className={`profile-picture ${this.props.customSize}`}
              src={this.props.imageUrl}
            />
          </label>
        </div>
      );
    }
    return (
      <div className="profile-picture-wrapper">
        <div className="profile-picture-heading">{this.props.heading}</div>
        {personCard}
      </div>
    );
  }
}

export default ProfilePicture;
