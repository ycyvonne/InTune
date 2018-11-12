import React, { Component } from "react";
import { Input, Header } from "../";
import "./ProfileColumn1.scss";

class ProfileColumn1 extends Component {
  handleFileChange(event) {
    console.log(URL.createObjectURL(event.target.files[0]));
    // TODO: update profile picture on frotend and send to backend
  }
  render() {
    var profilePictureSrc = this.props.user.spotifyData.images[0].url;
    return (
      <div className="profile-column1-wrapper">
        <Header
          subtitle="INTUNE"
          heading="Profile"
          subheading="We will match you with concerts and friends based on your info."
        />
        <div className="profile-details-wrapper">
          <div className="profile-picture-wrapper">
            <div className="profile-picture-heading">PROFILE PICTURE</div>
            <div className="person-card">
              <label
                className="profile-container"
                htmlFor="profile-image-input"
              >
                <img className="profile-picture" src={profilePictureSrc} />
                <div className="overlay">
                  <div>Upload!</div>
                </div>
              </label>
              <Input
                customId="profile-image-input"
                customType="file"
                customOnChange={event => this.handleFileChange(event)}
              />
            </div>
          </div>
          <div className="profile-music-type-wrapper">
            <div className="profile-picture-heading">
              PICK YOUR FAVORITE MUSIC TYPE
            </div>
            <form id="profile-music-form">
              <Input customType="text" />
              <Input customType="text" />
              <Input customType="text" />
              <Input customType="text" />
              <Input customType="text" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileColumn1;
